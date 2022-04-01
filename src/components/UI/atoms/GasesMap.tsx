import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";
import GenericIcon from "../../../assets/generic.png";
import {
  getCurrentUser,
  MAP_RESTRICTION,
  sortPeople,
  User,
} from "../../../index";
import {
  Person,
  PersonWithGasReadings,
  useCompanyGasReadings,
  usePersonGasReadings,
} from "../../../util/queryService";
import OverlayStyles from "../../styling/OverlayStyles";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import { Filter, shouldFilterPerson } from "../molecules/FilterBar";
import { MapTooltip } from "../molecules/MapTooltip";
import LatLngLiteral = google.maps.LatLngLiteral;

export const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
export const DEFAULT_MAP_ZOOM = 11;

interface GasDotMapProps {
  filter?: Filter;
}

interface GasMarker {
  person: Person;
  location: LatLngLiteral;
  density: string;
  densityUnits: string;
  gas: string;
  time: Date;
  icon: string;
}

const useStyles = makeStyles({
  tooltipText: {
    margin: "8px",
    whiteSpace: "nowrap",
  },
});

export const GasesMap: React.FC<GasDotMapProps> = (props) => {
  const overlayStyles = OverlayStyles();

  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const [loading, people] = usePeople(user, filter);
  const markers: GasMarker[] = intoMarkers(people);

  const [hoveredMarker, setHoveredMarker] = useState<GasMarker | undefined>();

  const onMarkerMouseOver = useCallback((marker: GasMarker) => {
    setHoveredMarker(marker);
  }, []);

  const onMarkerMouseOut = useCallback((marker: GasMarker) => {
    setHoveredMarker((prevMarker) =>
      JSON.stringify(marker) === JSON.stringify(prevMarker)
        ? undefined
        : prevMarker
    );
  }, []);

  const warnNoData = !loading && markers.length === 0;

  const styles = useStyles();

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop
          className={overlayStyles.backdrop}
          open={loading || warnNoData}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          {loading && <CircularProgress />}
          {warnNoData && <EmptyDataMessage />}
        </Backdrop>
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
        >
          {markers.map((marker) => (
            <Marker
              key={markerKey(marker)}
              position={marker.location}
              icon={marker.icon}
              onMouseOver={() => onMarkerMouseOver(marker)}
              onMouseOut={() => onMarkerMouseOut(marker)}
              onClick={() => onMarkerMouseOver(marker)}
            />
          ))}
          {hoveredMarker && (
            <MapTooltip
              location={hoveredMarker.location}
              hoverDistance={"20px"}
            >
              <h3 className={styles.tooltipText}>{hoveredMarker.gas}</h3>
              <p className={styles.tooltipText}>
                {hoveredMarker.density} {hoveredMarker.densityUnits}
              </p>
              <p className={styles.tooltipText}>
                {hoveredMarker.time.toLocaleString()}
              </p>
              <p className={styles.tooltipText}>{hoveredMarker.person.name}</p>
            </MapTooltip>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

const usePeople = (
  user: User | null,
  filter: Filter
): [boolean, PersonWithGasReadings[]] => {
  const [personAsPeopleLoading, personAsPeopleData] = usePersonAsPeople(
    filter.person?.id || "",
    filter,
    shouldFilterPerson(filter)
  );
  const [gasReadingsInCompanyLoading, gasReadingsInCompanyData] =
    useGasReadingsInCompany(
      user?.company.id || "",
      filter,
      !shouldFilterPerson(filter)
    );
  return [
    personAsPeopleLoading || gasReadingsInCompanyLoading,
    sortPeople([personAsPeopleData, gasReadingsInCompanyData].flat()),
  ];
};

const usePersonAsPeople = (
  personId: string,
  filter: Filter,
  execute = true
): [boolean, PersonWithGasReadings[]] => {
  const { loading, data } = usePersonGasReadings(
    {
      personId: personId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [loading, (data && [data.person]) || []];
};

const useGasReadingsInCompany = (
  companyId: string,
  filter: Filter,
  execute = true
): [boolean, PersonWithGasReadings[]] => {
  const { loading, data } = useCompanyGasReadings(
    {
      companyId: companyId,
      filter: {
        minTimestamp: filter.minTimestamp,
        maxTimestamp: filter.maxTimestamp,
      },
    },
    execute
  );
  return [loading, data?.company.people || []];
};

const intoMarkers = (people: PersonWithGasReadings[]): GasMarker[] =>
  people
    .map((person) =>
      person.gasReadings.map((gasReading) => ({
        person: person,
        location: {
          lat: Number(gasReading.coordinates[1]),
          lng: Number(gasReading.coordinates[0]),
        },
        icon: GenericIcon,
        time: new Date(gasReading.timestamp),
        density: gasReading.density,
        densityUnits: gasReading.densityUnits,
        gas: gasReading.gas,
      }))
    )
    .flat();

const markerKey = (marker: GasMarker): string => {
  const personId = marker.person.id;
  const time = marker.time.toISOString();
  return `${personId}-${time}`;
};
