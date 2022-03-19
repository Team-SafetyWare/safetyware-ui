import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

interface IncidentDotMapWidgetProps {
  incidents?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const IncidentDotMapWidget: React.FC<IncidentDotMapWidgetProps> = (
  props
) => {
  const accidents = props.incidents;
  const zoom = props.zoom;
  const center = props.center;

  function createMarker(
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    //Temporary fix (this component won't even be used soon)
    return <Marker key={Math.random()} position={location} />;
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
