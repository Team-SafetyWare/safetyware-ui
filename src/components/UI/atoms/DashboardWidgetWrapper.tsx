import AddIcon from "@mui/icons-material/Add";
import { Theme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import theme from "../../../Theme";
import { DashboardWidgetTile } from "./DashboardWidgetTile";

interface DashboardWidgetWrapperProps {
  widgetState?: any;
  setWidgetState: any;
  removeWidget?: any;
  editDashboardMode?: any;
  saveState: any;
}

export interface StyleProps {
  mediumScreen: boolean;
  numberOfWidgets: number;
}

const WIDGET_HEIGHT = 416;
const CONTAINER_PADDING = 16;

const useStyles = makeStyles<Theme, StyleProps>({
  container: {
    display: "flex",
    width: "100%",
    height: (props) => {
      let containerHeight = CONTAINER_PADDING;
      if (!props.mediumScreen) {
        const rows = Math.max(1, Math.ceil(props.numberOfWidgets / 2));
        containerHeight += rows * WIDGET_HEIGHT;
      } else {
        const rows = Math.max(1, props.numberOfWidgets);
        containerHeight += rows * WIDGET_HEIGHT;
      }
      return containerHeight.toString() + "px";
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  dropzone: {
    flex: 1,
    height: "100%",
    margin: "0 -8px 0 -8px",
  },
  widgetTileContainer: {
    padding: "0 8px 0 8px",
  },
  emptyDashboard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  emptyDashboardMessage: {
    marginTop: "8px",
    fontSize: "18px",
    textAlign: "center",
  },
});

export const DashboardWidgetWrapper: React.FC<DashboardWidgetWrapperProps> = (
  props
) => {
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const styleProps = {
    mediumScreen: mediumScreen,
    numberOfWidgets: props.widgetState.length,
  };

  const styles = useStyles(styleProps);

  const onChange = (sourceId: any, sourceIndex: any, targetIndex: any) => {
    const nextState = swap(props.widgetState, sourceIndex, targetIndex);
    props.setWidgetState(nextState);
    props.saveState();
  };

  return (
    <div
      className={styles.container}
      style={{ touchAction: !props.editDashboardMode ? "auto" : "none" }}
    >
      {props.widgetState && Object.keys(props.widgetState).length === 0 ? (
        <div className={styles.emptyDashboard}>
          <AddIcon fontSize={"large"} />
          <p className={styles.emptyDashboardMessage}>
            You have no widgets on your dashboard! Press the Add Widget button
            to place widgets on the dashboard.
          </p>
        </div>
      ) : (
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            className={styles.dropzone}
            id="widget-drop-zone"
            boxesPerRow={!mediumScreen ? 2 : 1}
            rowHeight={WIDGET_HEIGHT}
            disableDrag={!props.editDashboardMode}
          >
            {props.widgetState.map((widget: any) => (
              <GridItem
                key={widget.widgetName}
                className={styles.widgetTileContainer}
              >
                <DashboardWidgetTile
                  widget={widget}
                  removeWidget={props.removeWidget}
                  editDashboardMode={props.editDashboardMode}
                />
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      )}
    </div>
  );
};
