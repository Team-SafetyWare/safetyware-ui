import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";

interface TravelHistoryTrailProps {
  center?: any;
  data: any;
}
export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  const segments = props.data
    .map((person: any) => {
      return person.segments
        .map((segment: any) => {
          return {
            path: segment,
            color: person.color,
          };
        })
        .flat();
    })
    .flat();
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={{ gestureHandling: "greedy" }}
    >
      {segments.map((segment: any) => (
        // eslint-disable-next-line react/jsx-key
        <Polyline
          path={segment.path}
          options={{
            strokeColor: segment.color,
            strokeOpacity: 1,
            strokeWeight: 3,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            zIndex: 1,
          }}
        />
      ))}
    </GoogleMap>
  );
};
