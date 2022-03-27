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
const PX_STRING = "px";

const useStyles = makeStyles<Theme, StyleProps>({
  container: {
    display: "flex",
    touchAction: "none",
    paddingTop: "5px",
    width: "100%",
    height: (props) => {
      if (!props.mobile) {
        if (props.numberOfWidgets > 2) {
          return (2 * WIDGET_HEIGHT).toString() + PX_STRING;
        } else {
          return WIDGET_HEIGHT.toString() + PX_STRING;
        }
      } else {
        return (props.numberOfWidgets * WIDGET_HEIGHT).toString() + PX_STRING;
      }
    },
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
    <GridContextProvider onChange={onChange}>
      <div className={styles.container}>
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
      </div>
    </GridContextProvider>
  );
};
