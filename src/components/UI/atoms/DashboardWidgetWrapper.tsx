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
  largeContainer: {
    display: "flex",
    touchAction: "none",
    paddingTop: "5px",
    width: "100%",
    height: "850px",
    overflow: "hidden",
  },
  smallContainer: {
    display: "flex",
    touchAction: "none",
    paddingTop: "5px",
    width: "100%",
    height: "400px",
    overflow: "hidden",
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

  const onChange = (sourceId: any, sourceIndex: any, targetIndex: any) => {
    const nextState = swap(props.widgetState, sourceIndex, targetIndex);
    props.setWidgetState(nextState);
  };

  return (
    <GridContextProvider onChange={onChange}>
      {props.widgetState.length > 2 ? (
        <div className={styles.largeContainer}>
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
      ) : (
        <div className={styles.smallContainer}>
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
      )}
    </GridContextProvider>
  );
};
