import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";

interface TravelHistoryTrailWidgetProps {
  path?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
  overflow: "hidden",
};

export const TravelHistoryTrailWidget: React.FC<
  TravelHistoryTrailWidgetProps
> = (props) => {
  const paths = props.path;
  const center = props.center;
  const zoom = props.zoom;

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
    <GoogleMap
      id="marker-example"
      mapContainerStyle={containerStyle}
      zoom={zoom}
      center={center}
    >
      <Polyline path={paths} options={options} />
    </GoogleMap>
  );
};
