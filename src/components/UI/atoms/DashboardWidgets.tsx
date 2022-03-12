import { makeStyles } from "@mui/styles";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { WidgetColumn } from "./WidgetColumn";

interface DashboardWidgetProps {
  widgetWrapperState: any;
  onDragEndFunction: any;
  reorderFunction: any;
}

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

export const DashboardWidgets: React.FC<DashboardWidgetProps> = (props) => {
  const styles = useStyles();

  // if first
  return (
    <div className={styles.test}>
      <DragDropContext onDragEnd={props.onDragEndFunction}>
        <WidgetColumn state={props.widgetWrapperState} />
      </DragDropContext>
    </div>
  );
};
