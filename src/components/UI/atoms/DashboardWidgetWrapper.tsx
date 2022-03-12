import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
// import { HazardousAreaHeatMapWidget } from "./HazardousAreaHeatMapWidget";
import { BarGraphWidget } from "./BarGraphWidget";
import { DashboardWidgets } from "./DashboardWidgets";
import HazardousAreaHeatMapWidget from "./HazardousAreaHeatMapWidget";
import IncidentDotMapWidget from "./IncidentDotMapWidget";
import { TravelHistoryTrailWidget } from "./TravelHistoryTrailWidget";

interface DashboardWidgetTileData {
  widgetName: string;
  widget: any;
}

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

const useStyles = makeStyles({
  test: {
    paddingTop: "15px",
    height: "400px",
    width: "100%",
  },
});

const reorder = (
  list: DashboardWidgetTileData[],
  startIndex: number,
  endIndex: number
): DashboardWidgetTileData[] => {
  console.log(startIndex);
  console.log(endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  console.log([removed]);
  result.splice(endIndex, 0, removed);
  console.log(result);

  return result;
};

export const DashboardWidgetWrapper = (): JSX.Element => {
  const styles = useStyles();

  const [state, setState] = useState([
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
    {
      widgetName: "Empty",
      widget: "",
    },
    {
      widgetName: "Empty",
      widget: "",
    },
  ]);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(state);
    const items: DashboardWidgetTileData[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(items);
  };

  return (
    <>
      <DashboardWidgets
        widgetWrapperState={state.slice(0, 2)}
        onDragEndFunction={onDragEnd}
        reorderFunction={reorder}
      />
      <DashboardWidgets
        widgetWrapperState={state.slice(2, 6)}
        onDragEndFunction={onDragEnd}
        reorderFunction={reorder}
      />
    </>
  );
};
