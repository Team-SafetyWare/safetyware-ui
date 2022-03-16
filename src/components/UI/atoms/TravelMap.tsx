import React from "react";
import {
  CompanyLocationData,
  Person,
  useCompanyLocations,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;

const TRAIL_SPLIT_MS = 10 * 60 * 1000;

interface TrailPoint extends LatLngLiteral {
  time: Date;
}

interface Trail {
  path: TrailPoint[];
  person: Person;
  color: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TravelMapProps {}
export const TravelMap: React.FC<TravelMapProps> = (props) => {
  const user = getCurrentUser();

  const { data, loading } = useCompanyLocations({
    companyId: user?.company.id,
    filter: {
      minTimestamp: null,
      maxTimestamp: null,
    },
  });

  const trails: Trail[] = (data && intoTrails(data)) ?? [];

  return (
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
    >
      {trails.map((trail: any) => (
        <Polyline
          key={trailKey(trail)}
          path={trail.path}
          options={{
            strokeColor: trail.color,
            strokeOpacity: 1,
            strokeWeight: 3,
            clickable: false,
          }}
        />
      ))}
    </GoogleMap>
  );
};

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

const intoTrails = (data: CompanyLocationData): Trail[] =>
  data?.company.people
    .map((person) => {
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
        color: "#ff0000",
      }));
    })
    .flat();

const trailKey = (trail: Trail): string => {
  const personId = trail.person.id;
  const start = trail.path[0].time.toISOString();
  const end = trail.path[trail.path.length - 1].time.toISOString();
  return `${personId}-${start}-${end}`;
};
