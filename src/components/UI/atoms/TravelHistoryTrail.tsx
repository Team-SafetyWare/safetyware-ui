import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";
import PolylineOptions = google.maps.PolylineOptions;

interface TravelHistoryTrailProps {
  center?: any;
  path: TravelHistoryPoint[];
}

export interface TravelHistoryPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const options: PolylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  };

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      <Polyline path={props.path} options={options} />
    </GoogleMap>
  );
};
