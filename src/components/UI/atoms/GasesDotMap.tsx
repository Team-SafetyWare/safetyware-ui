import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface GasesDotMapProps {
  gases?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

export const GasesDotMap: React.FC<GasesDotMapProps> = (props) => {
  const gases = props.gases;
  const zoom = props.zoom;
  const center = props.center;

  function createMarker(
    location: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    return <Marker position={location} />;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {gases.map((accident: google.maps.LatLng | google.maps.LatLngLiteral) =>
        createMarker(accident)
      )}
    </GoogleMap>
  );
};

export default React.memo(GasesDotMap);
