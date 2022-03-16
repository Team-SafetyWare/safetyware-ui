import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS_FOR_COMPANY } from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { GoogleMap, Marker } from "@react-google-maps/api";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TravelMapProps {}
export const TravelMap: React.FC<TravelMapProps> = (props) => {
  const user = getCurrentUser();
  const { data, loading } = useQuery(GET_LOCATIONS_FOR_COMPANY, {
    variables: {
      companyId: user?.company.id,
      filter: {
        minTimestamp: null,
        maxTimestamp: null,
      },
    },
  });

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
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
};
