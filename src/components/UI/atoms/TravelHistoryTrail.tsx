import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";

interface TravelHistoryTrailProps {
  center?: any;
  data: any;
}
export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  // const paths = props.data.map((person: any) => person.segments).flat();
  const segments = props.data.map((person: any) => {
    return {
      path: person.segments.flat(),
      color: person.color,
    };
  });
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {segments.map((segment: any) => (
        // eslint-disable-next-line react/jsx-key
        <Polyline
          path={segment.path}
          options={{
            strokeColor: segment.color,
            strokeOpacity: 0.75,
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
