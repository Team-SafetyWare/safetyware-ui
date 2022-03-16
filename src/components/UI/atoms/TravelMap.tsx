import React, { useState } from "react";
import {
  CompanyLocationData,
  Person,
  PersonWithLocationReadings,
  useCompanyLocations,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;
import ControlPosition = google.maps.ControlPosition;
import { v4 as uuidV4 } from "uuid";
import { Filter } from "./CustomBoxUserSelect";

const TRAIL_SPLIT_MS = 10 * 60 * 1000;

const TRAIL_COLORS = [
  "#e6194b", // Red
  "#3cb44b", // Green
  "#4363d8", // Blue
  "#008080", // Cyan
  "#911eb4", // Purple
  "#f58231", // Orange
  "#800000", // Brown red
  "#f032e6", // Pink
  "#9a6324", // Brown
  "#808000", // Olive
  "#000075", // Dark blue
];

interface TrailPoint extends LatLngLiteral {
  time: Date;
}

interface Trail {
  path: TrailPoint[];
  person: Person;
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TravelMapProps {
  filter?: Filter;
}

export const TravelMap: React.FC<TravelMapProps> = (props) => {
  const user = getCurrentUser();
  const filter: Filter = props.filter ?? {};

  const { data } = useCompanyLocations({
    companyId: user?.company.id,
    filter: {
      minTimestamp: filter.minTimestamp,
      maxTimestamp: filter.maxTimestamp,
    },
  });

  const people: PersonWithLocationReadings[] = (data && intoPeople(data)) ?? [];
  const trails: Trail[] = intoTrails(people);

  const [legendElementId] = useState(uuidV4().toString());
  const [showLegend, setShowLegend] = useState(false);

  return (
    <>
      <div
        id={legendElementId}
        hidden={!showLegend}
        style={{
          background: "rgb(255, 255, 255) none repeat scroll 0% 0% padding-box",
          border: "0px none",
          marginLeft: "10px",
          padding: "0px 17px",
          textTransform: "none",
          appearance: "none",
          cursor: "pointer",
          userSelect: "none",
          direction: "ltr",
          overflow: "hidden",
          verticalAlign: "middle",
          color: "rgb(86, 86, 86)",
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: "18px",
          borderBottomRightRadius: "2px",
          borderTopRightRadius: "2px",
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
        }}
      >
        <p>Legend</p>
        {people.map((person, personIndex) => {
          const color = indexToColor(personIndex);
          return (
            <div key={`${person.id}-${color}`}>
              <p>
                <span
                  style={{
                    height: "16px",
                    width: "16px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                />
                {person.name}
              </p>
            </div>
          );
        })}
      </div>
      <GoogleMap
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={12}
        center={{
          lat: 51.049999,
          lng: -114.1283,
        }}
        options={{ gestureHandling: "greedy" }}
        onLoad={(map) => {
          const controls = map.controls[ControlPosition.LEFT_TOP];
          const legend = document.getElementById(legendElementId);
          controls.push(legend);
        }}
        onTilesLoaded={() => {
          setShowLegend(true);
        }}
      >
        {trails.map((trail: any) => (
          <Polyline
            key={trailKey(trail)}
            path={trail.path}
            options={{
              strokeColor: trail.color,
              strokeOpacity: 1,
              strokeWeight: 4,
              clickable: false,
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

const intoPeople = (data: CompanyLocationData): PersonWithLocationReadings[] =>
  data.company.people.slice().sort((a, b) => a.name.localeCompare(b.name));

const intoTrails = (people: PersonWithLocationReadings[]): Trail[] =>
  people
    .map((person, person_index) => {
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
        color: indexToColor(person_index),
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

const indexToColor = (index: number): string =>
  TRAIL_COLORS[index % TRAIL_COLORS.length];

const trailKey = (trail: Trail): string => {
  const personId = trail.person.id;
  const start = trail.path[0].time.toISOString();
  const end = trail.path[trail.path.length - 1].time.toISOString();
  return `${personId}-${start}-${end}`;
};
