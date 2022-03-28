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
  mobile: boolean;
  numberOfWidgets: number;
}

const WIDGET_HEIGHT = 410;
const CONTAINER_PADDING = 24;

const useStyles = makeStyles<Theme, StyleProps>({
  container: {
    display: "flex",
    paddingTop: "5px",
    width: "100%",
    height: (props) => {
      let containerHeight = CONTAINER_PADDING;
      if (!props.mobile) {
        if (props.numberOfWidgets > 2) {
          containerHeight += 2 * WIDGET_HEIGHT;
        } else {
          containerHeight += WIDGET_HEIGHT;
        }
      } else {
        if (props.numberOfWidgets > 0) {
          containerHeight += props.numberOfWidgets * WIDGET_HEIGHT;
        } else {
          containerHeight += WIDGET_HEIGHT;
        }
      }
      return containerHeight.toString() + "px";
    },
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
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
  emptyDashboard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  emptyDashboardMessage: {
    marginTop: "15px",
    fontSize: "18px",
    textAlign: "center",
  },
});

export const DashboardWidgetWrapper: React.FC<DashboardWidgetWrapperProps> = (
  props
) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const styleProps = {
    mobile: mobile,
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
            boxesPerRow={!mobile ? 2 : 1}
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
