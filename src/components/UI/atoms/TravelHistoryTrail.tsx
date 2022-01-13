import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import React from "react";

interface TravelHistoryTrailProps {
  center?: any;
  path?: any;
}

export const TravelHistoryTrail: React.FC<TravelHistoryTrailProps> = (
  props
) => {
  const paths = props.path;
  const center = props.center;

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: { paths },
    zIndex: 1,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Polyline path={paths} options={options} />
      </GoogleMap>
    </LoadScript>
  );
};
