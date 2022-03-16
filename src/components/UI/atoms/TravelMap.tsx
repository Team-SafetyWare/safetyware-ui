import React from "react";
import { useCompanyLocations } from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;

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

  const points: LatLngLiteral[] =
    data?.company.people
      .map((person) => person.locationReadings)
      .flat()
      .map((locationReading) => ({
        lat: Number(locationReading.coordinates[1]),
        lng: Number(locationReading.coordinates[0]),
      })) ?? [];

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
      <Polyline
        path={points}
        options={{
          strokeColor: "#ff0000",
          strokeOpacity: 1,
          strokeWeight: 3,
          clickable: false,
        }}
      />
    </GoogleMap>
  );
};
