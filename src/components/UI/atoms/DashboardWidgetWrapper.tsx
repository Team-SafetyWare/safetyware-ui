import { makeStyles } from "@mui/styles";
import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { DashboardWidgetTile } from "./DashboardWidgetTile";

interface DashboardWidgetWrapperProps {
  widgetState?: any;
  setWidgetState: any;
  removeWidget?: any;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    touchAction: "none",
    paddingTop: "5px",
    width: "100%",
    height: "850px",
  },
  dropzone: {
    flex: 1,
    height: "100%",
  },
  widgetTileContainer: {
    paddingTop: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
});

export const DashboardWidgetWrapper: React.FC<DashboardWidgetWrapperProps> = (
  props
) => {
  const styles = useStyles();

  const onChange = (
    sourceId: any,
    sourceIndex: any,
    targetIndex: any,
    targetId: any
  ) => {
    const nextState = swap(props.widgetState, sourceIndex, targetIndex);
    props.setWidgetState(nextState);
  };

  return (
    <GridContextProvider onChange={onChange}>
      <div className={styles.container}>
        <GridDropZone
          className={styles.dropzone}
          id="drop-zone"
          boxesPerRow={2}
          rowHeight={410}
        >
          {props.widgetState.map((widget: any) => (
            <GridItem
              key={widget.widgetName}
              className={styles.widgetTileContainer}
            >
              <DashboardWidgetTile
                widget={widget}
                removeWidget={props.removeWidget}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};
