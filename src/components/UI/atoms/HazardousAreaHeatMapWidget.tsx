import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface HazardousAreaHeatMapWidgetProps {
  accidents?: any;
  startDate?: any;
  endDate?: any;
  center?: any;
  zoom?: any;
}

export const HazardousAreaHeatMapWidget: React.FC<
  HazardousAreaHeatMapWidgetProps
> = (props) => {
  const accidents = props.accidents == undefined ? [] : props.accidents;
  const center = props.center;
  const zoom = props.zoom;

  function createHeatMapData() {
    let data = [];
    for (const accident of accidents) {
      data.push(new google.maps.LatLng(accident.lat, accident.lng));
    }
    return data;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <HeatmapLayer data={createHeatMapData()} />
    </GoogleMap>
  );
};

export default React.memo(HazardousAreaHeatMapWidget);
