import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { defaultFilter } from "../molecules/FilterBar";
import { HazardMap } from "../molecules/HazardMap";
import { IncidentsBarGraph } from "../molecules/IncidentsBarGraph";
import { IncidentsMap } from "../molecules/IncidentsMap";
import { TravelMap } from "../molecules/TravelMap";
import { GasesMap } from "./GasesMap";

interface DashboardSummaryTileProps {
  widget?: any;
  removeWidget?: any;
  editDashboardMode?: any;
}

interface WidgetTable {
  HazardMap: any;
  IncidentsBarGraph: any;
  IncidentsMap: any;
  TravelMap: any;
  GasesMap: any;
}

const useStyles = makeStyles({
  widgetTile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "400px",
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
    cursor: "default",
  },
  widgetTileAnimated: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "400px",
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
    animation: "$shake .25s infinite",
    cursor: "grab",
  },
  widgetInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  widgetName: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "12px 0px 12px 8px",
  },
  removeButton: {
    color: theme.palette.primary.main,
  },
  widget: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  "@keyframes shake": {
    "0%": { transform: "translate(0px, 0px) rotate(.25deg)" },
    "50%": { transform: "translate(0px, 0px) rotate(-.25deg) " },
  },
});

export const DashboardWidgetTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const widgetTable = {
    HazardMap: (
      <HazardMap
        filter={defaultFilter()}
        gestureHandling={mobile ? "cooperative" : undefined}
      />
    ),
    IncidentsBarGraph: <IncidentsBarGraph filter={defaultFilter()} />,
    GasesMap: <GasesMap filter={defaultFilter()} />,
    IncidentsMap: (
      <IncidentsMap
        filter={defaultFilter()}
        gestureHandling={mobile ? "cooperative" : undefined}
      />
    ),
    TravelMap: (
      <TravelMap
        filter={defaultFilter()}
        gestureHandling={mobile ? "cooperative" : undefined}
        legendDefaultCollapsed={true}
        legendCompact={true}
      />
    ),
  };

  return (
    <>
      <div
        className={
          props.editDashboardMode
            ? styles.widgetTileAnimated
            : styles.widgetTile
        }
      >
        <div className={styles.widgetInfo}>
          <p className={styles.widgetName}>{props.widget.widgetName}</p>
          {props.editDashboardMode && (
            <IconButton
              className={styles.removeButton}
              onClick={() => props.removeWidget(props.widget)}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
        </div>
        {widgetTable[props.widget.widget as keyof WidgetTable]}
      </div>
    </>
  );
};
