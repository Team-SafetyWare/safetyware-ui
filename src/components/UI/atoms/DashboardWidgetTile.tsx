import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { defaultFilter } from "../molecules/FilterBar";
import { HazardMap } from "../molecules/HazardMap";
import { IncidentsBarGraph } from "../molecules/IncidentsBarGraph";
import { IncidentsMap } from "../molecules/IncidentsMap";
import { TravelMap } from "../molecules/TravelMap";
import { GasesMap } from "./GasesMap";
import LatLngLiteral = google.maps.LatLngLiteral;

const DEFAULT_MAP_CENTER: LatLngLiteral = {
  lat: 51.045,
  lng: -114.072,
};
const DEFAULT_MAP_ZOOM = 10;

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
  shake: {
    animation: "$shake .25s infinite",
  },
  widgetInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  widgetName: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: 0,
  },
  removeButton: {
    color: theme.palette.primary.main,
  },
  widget: {
    height: "100%",
    width: "100%",
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
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
      />
    ),
    IncidentsBarGraph: <IncidentsBarGraph filter={defaultFilter()} />,
    GasesMap: (
      <GasesMap
        filter={defaultFilter()}
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
      />
    ),
    IncidentsMap: (
      <IncidentsMap
        filter={defaultFilter()}
        gestureHandling={mobile ? "cooperative" : undefined}
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
      />
    ),
    TravelMap: (
      <TravelMap
        filter={defaultFilter()}
        gestureHandling={mobile ? "cooperative" : undefined}
        legendDefaultCollapsed={true}
        legendCompact={true}
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
      />
    ),
  };

  return (
    <>
      <Card
        className={props.editDashboardMode ? styles.shake : undefined}
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          cursor: props.editDashboardMode ? "grab" : "default",
        }}
      >
        <CardContent>
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
        </CardContent>
        <CardMedia sx={{ height: "100%" }}>
          {widgetTable[props.widget.widget as keyof WidgetTable]}
        </CardMedia>
      </Card>
    </>
  );
};
