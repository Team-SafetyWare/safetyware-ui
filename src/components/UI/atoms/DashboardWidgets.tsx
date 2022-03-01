import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import IncidentDotMapWidget from "./IncidentDotMapWidget";
import { WidgetColumn } from "./WidgetColumn";

interface DashboardWidgetTileData {
  widgetName: string;
  widget: any;
}

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
    height: "400px",
    width: "100%",
  },
});

const reorder = (
  list: DashboardWidgetTileData[],
  startIndex: number,
  endIndex: number
): DashboardWidgetTileData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const DashboardWidgets = (): JSX.Element => {
  const styles = useStyles();

  const [state, setState] = useState([
    {
      widgetName: "Incident Dot Map",
      widget: (
        <IncidentDotMapWidget incidents={incidents} center={center} zoom={10} />
      ),
    },
    {
      widgetName: "Incident Bar Graph",
      widget: (
        <IncidentDotMapWidget incidents={incidents} center={center} zoom={10} />
      ),
    },
  ]);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: DashboardWidgetTileData[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(items);
  };

  return (
    <div className={styles.test}>
      <DragDropContext onDragEnd={onDragEnd}>
        <WidgetColumn state={state} />
      </DragDropContext>
    </div>
  );
};
