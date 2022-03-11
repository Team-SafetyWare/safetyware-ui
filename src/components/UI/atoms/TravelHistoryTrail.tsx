import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";
import PolylineOptions = google.maps.PolylineOptions;

interface TravelHistoryTrailProps {
  center?: any;
  data: any;
}
export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  const paths = props.data.map((person: any) => person.segments).flat();
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const options: PolylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  };

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {paths.map((path: any) => (
        // eslint-disable-next-line react/jsx-key
        <Polyline path={path} options={options} />
      ))}
    </GoogleMap>
  );
};
