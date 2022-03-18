import React from "react";
import { makeStyles } from "@mui/styles";
import { OverlayView } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;

const useStyles = makeStyles({
  tooltip: {
    position: "relative",
    right: "calc(100% / 2)",
    bottom: "216px",
    filter: "drop-shadow(0 0 5px rgba(0,0,0,0.2));",
  },
  tooltipContent: {
    position: "relative",
    padding: "8px",
    fontSize: "1rem",
    backgroundColor: "white",
    borderRadius: "4px",
    zIndex: "2",
  },
  tooltipArrow: {
    width: "64px",
    height: "64px",
    position: "relative",
    backgroundColor: "white",
    borderRadius: "4px",
    transform: "rotate(45deg)",
    translate: "-50%",
    left: "50%",
    top: "120px",
  },
});

interface MapTooltipProps {
  location: LatLngLiteral;
}

export const MapTooltip: React.FC<MapTooltipProps> = (props) => {
  const styles = useStyles();

  return (
    <OverlayView
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={props.location}
    >
      <div className={styles.tooltip}>
        <div className={styles.tooltipArrow} />
        <div className={styles.tooltipContent}>
          <>{props.children}</>
        </div>
      </div>
    </OverlayView>
  );
};
