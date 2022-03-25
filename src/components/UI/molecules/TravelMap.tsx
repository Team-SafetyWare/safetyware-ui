import React, { useCallback, useEffect, useState } from "react";
import {
  Person,
  PersonWithLocationReadings,
  useCompanyLocations,
  usePersonLocations,
} from "../../../util/queryService";
import {
  getCurrentUser,
  MAP_RESTRICTION,
  modularIndex,
  sortPeople,
  User,
} from "../../../index";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;
import { Filter, shouldFilterPerson } from "./FilterBar";
import { makeStyles } from "@mui/styles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";
import MapMouseEvent = google.maps.MapMouseEvent;
import { MapTooltip } from "./MapTooltip";
import { quadtree, Quadtree } from "d3-quadtree";
import { LegendItem, MapLegend } from "./MapLegend";
import CircularProgress from "@mui/material/CircularProgress";

const TRAIL_SPLIT_MS = 10 * 60 * 1000;

const ROADMAP_PALETTE = [
  "#e6194b", // Red
  "#4363d8", // Blue
  "#808000", // Olive
  "#3cb44b", // Green
  "#911eb4", // Purple
  "#f58231", // Orange
];

const SATELLITE_PALETTE = [
  "#fabed4", // Pink
  "#42d4f4", // Cyan
  "#ffd8b1", // Apricot
  "#aaffc3", // Mint
  "#bfef45", // Lime
  "#fffac8", // Beige
];

const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.03,
  lng: -114.466,
};
const DEFAULT_MAP_ZOOM = 9;

enum MapTypeId {
  Satellite = "satellite",
  Hybrid = "hybrid",
}

const DEFAULT_MAP_TYPE_ID = MapTypeId.Hybrid;

interface TrailPoint extends LatLngLiteral {
  time: Date;
}

interface Trail {
  path: TrailPoint[];
  person: Person;
  personIndex: number;
}

interface QuadPoint {
  location: LatLngLiteral;
  person: Person;
  time: Date;
}

interface TravelMapProps {
  filter?: Filter;
  legendDefaultCollapsed?: boolean;
  legendCompact?: boolean;
}

const useStyles = makeStyles({
  tooltipText: {
    margin: "8px",
    whiteSpace: "nowrap",
  },
});

export const TravelMap: React.FC<TravelMapProps> = (props) => {
  const overlayStyles = OverlayStyles();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const people: PersonWithLocationReadings[] = usePeople(user, filter);
  const trails: Trail[] = intoTrails(people);
  const pointTree = intoPointTree(trails);

  const [map, setMap] = useState<google.maps.Map | undefined>();

  const [tilesLoaded, setTilesLoaded] = useState(false);

  const [mapTypeId, setMapTypeId] = useState<string>(DEFAULT_MAP_TYPE_ID);

  useEffect(() => {
    if (people.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [people]);

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      map.setMapTypeId(mapTypeId);
      setMap(map);
    },
    [mapTypeId]
  );

  const onMapTypeIdChanged = useCallback(() => {
    const mapTypeId = map?.getMapTypeId();
    mapTypeId && setMapTypeId(mapTypeId);
  }, [map]);

  const [tooltipPoint, setTooltipPoint] = useState<QuadPoint | undefined>();

  const onTrailMouseOver = useCallback(
    (event: MapMouseEvent) => {
      const location = eventIntoLocation(event);
      const nearest = location && nearestPoint(location, pointTree);
      const tooltipPoint = nearest && {
        ...nearest,
        location: location,
      };
      setTooltipPoint(tooltipPoint);
    },
    [pointTree]
  );

  const onTrailMouseOut = useCallback(() => {
    setTooltipPoint(undefined);
  }, []);

  useEffect(() => {
    if (trails.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [trails]);

  const satelliteView = [
    MapTypeId.Satellite.toString(),
    MapTypeId.Hybrid.toString(),
  ].includes(mapTypeId ?? "");
  const palette = satelliteView ? SATELLITE_PALETTE : ROADMAP_PALETTE;

  const legendItems = intoLegendItems(people, palette);
  const showLegend = tilesLoaded && legendItems.length !== 0;

  const styles = useStyles();

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={isEmpty || isLoading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {isLoading ? <CircularProgress /> : <EmptyDataMessage />}
        </Backdrop>
        <MapLegend
          map={map}
          items={legendItems}
          hidden={!showLegend}
          defaultCollapsed={props.legendDefaultCollapsed}
          compact={props.legendCompact}
        />
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          options={{
            gestureHandling: "greedy",
            restriction: MAP_RESTRICTION,
          }}
          zoom={DEFAULT_MAP_ZOOM}
          center={DEFAULT_MAP_CENTER}
          onLoad={onMapLoad}
          onTilesLoaded={() => setTilesLoaded(true)}
          mapTypeId={mapTypeId}
          onMapTypeIdChanged={onMapTypeIdChanged}
        >
          {trails.map((trail) => (
            <Polyline
              key={trailKey(trail)}
              path={trail.path}
              options={{
                strokeColor: modularIndex(palette, trail.personIndex),
                strokeOpacity: 1,
                strokeWeight: 6,
              }}
              onMouseOver={onTrailMouseOver}
              onMouseMove={onTrailMouseOver}
              onMouseOut={onTrailMouseOut}
            />
          ))}
          {tooltipPoint && (
            <MapTooltip location={tooltipPoint.location}>
              <h3 className={styles.tooltipText}>{tooltipPoint.person.name}</h3>
              <p className={styles.tooltipText}>
                {tooltipPoint.time.toLocaleString()}
              </p>
            </MapTooltip>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

const usePeople = (user: User | null, filter: Filter) =>
  sortPeople(
    [
      usePersonAsPeople(
        filter.person?.id || "",
        filter,
        shouldFilterPerson(filter)
      ),
      usePeopleInCompany(
        user?.company.id || "",
        filter,
        !shouldFilterPerson(filter)
      ),
    ].flat()
  );

const usePeopleInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): PersonWithLocationReadings[] => {
  const { data } = useCompanyLocations(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return data?.company.people || [];
};

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  execute = true
): PersonWithLocationReadings[] => {
  const { data } = usePersonLocations(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return (data && [data.person]) || [];
};

const intoTrails = (people: PersonWithLocationReadings[]): Trail[] =>
  people
    .map((person, personIndex) => {
      const locations: TrailPoint[] = person.locationReadings.map(
        (location) => ({
          lat: Number(location.coordinates[1]),
          lng: Number(location.coordinates[0]),
          time: new Date(location.timestamp),
        })
      );
      const segments = splitWhen(
        locations,
        (a, b) => b.time.getTime() - a.time.getTime() >= TRAIL_SPLIT_MS
      );
      return segments.map((path) => ({
        path: path,
        person: {
          id: person.id,
          name: person.name,
        },
        personIndex: personIndex,
      }));
    })
    .flat();

const splitWhen = <T,>(arr: T[], split: (a: T, b: T) => boolean): T[][] => {
  const segments: T[][] = [];
  let sliceStart = 0;
  let sliceEnd = 0;
  while (sliceEnd < arr.length) {
    sliceEnd += 1;
    if (sliceEnd == arr.length || split(arr[sliceEnd - 1], arr[sliceEnd])) {
      segments.push(arr.slice(sliceStart, sliceEnd));
      sliceStart = sliceEnd;
    }
  }
  return segments;
};

const trailKey = (trail: Trail): string => {
  const personId = trail.person.id;
  const start = trail.path[0].time.toISOString();
  const end = trail.path[trail.path.length - 1].time.toISOString();
  return `${personId}-${start}-${end}`;
};

const eventIntoLocation = (event: MapMouseEvent): LatLngLiteral | undefined =>
  (event.latLng && {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  }) ||
  undefined;

const intoPointTree = (trails: Trail[]): Quadtree<QuadPoint> =>
  quadtree<QuadPoint>()
    .x((d) => d.location.lat)
    .y((d) => d.location.lng)
    .addAll(trails.map(trailIntoQuadPoints).flat());

const trailIntoQuadPoints = (trail: Trail): QuadPoint[] =>
  trail.path.map((point) => ({
    location: point,
    person: trail.person,
    time: point.time,
  }));

const nearestPoint = (
  location: LatLngLiteral,
  tree: Quadtree<QuadPoint>
): QuadPoint | undefined => tree.find(location.lat, location.lng);

const intoLegendItems = (people: Person[], palette: string[]): LegendItem[] =>
  people.map((person, index) => ({
    color: modularIndex(palette, index),
    text: person.name,
  }));
