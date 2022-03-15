import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { BarGraphWidget } from "../atoms/BarGraphWidget";
import { DashboardWidgetWrapper } from "../atoms/DashboardWidgetWrapper";
import HazardousAreaHeatMapWidget from "../atoms/HazardousAreaHeatMapWidget";
import IncidentDotMapWidget from "../atoms/IncidentDotMapWidget";
import { TravelHistoryTrailWidget } from "../atoms/TravelHistoryTrailWidget";
import { DashboardInfo } from "../molecules/DashboardInfo";
import { DashboardSummary } from "../molecules/DashboardSummary";

/* see https://mui.com/styles/basics/ */
const useStyles = makeStyles({
  dashboardContent: {},
});

const barGraphData = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

const incidents = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

export const Home: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const [inactiveWidgets, setInactiveWidgets] = useState([
    {
      widgetName: "Hazardous Area Heat Map",
      widget: (
        <HazardousAreaHeatMapWidget
          accidents={incidents}
          center={center}
          zoom={10}
        />
      ),
    },
    {
      widgetName: "Bar Graph",
      widget: <BarGraphWidget data={barGraphData} />,
    },
  ]);

  const [activeWidgets, setActiveWidgets] = useState([
    {
      widgetName: "Incident Dot Map",
      widget: (
        <IncidentDotMapWidget incidents={incidents} center={center} zoom={10} />
      ),
    },
    {
      widgetName: "Travel History Trail",
      widget: (
        <TravelHistoryTrailWidget path={incidents} center={center} zoom={10} />
      ),
    },
  ]);

  const addWidget = (selectedWidget: any) => {
    setActiveWidgets([...activeWidgets, selectedWidget]);

    let array = [...inactiveWidgets];
    array.splice(inactiveWidgets.indexOf(selectedWidget), 1);
    setInactiveWidgets(array);
  };

  return (
    <div className={styles.dashboardContent}>
      <DashboardInfo
        activeWidgetState={activeWidgets}
        inactiveWidgetState={inactiveWidgets}
        updateWidgetStates={addWidget}
      />
      {matches && <DashboardSummary />}
      <DashboardWidgetWrapper
        widgetState={activeWidgets}
        setWidgetState={setActiveWidgets}
      />
    </div>
  );
};
