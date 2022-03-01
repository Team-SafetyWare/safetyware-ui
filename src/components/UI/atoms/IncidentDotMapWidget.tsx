import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
  overflow: "hidden",
};

interface IncidentDotMapWidgetProps {
  incidents?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

export const IncidentDotMapWidget: React.FC<IncidentDotMapWidgetProps> = (
  props
) => {
  const accidents = props.incidents;
  const zoom = props.zoom;
  const center = props.center;

  function createMarker(
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    return <Marker position={location} />;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {accidents.map(
        (accident: google.maps.LatLng | google.maps.LatLngLiteral) =>
          createMarker(accident)
      )}
    </GoogleMap>
  );
};

export default React.memo(IncidentDotMapWidget);
