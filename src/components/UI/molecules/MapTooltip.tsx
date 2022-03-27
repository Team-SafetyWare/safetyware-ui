import React from "react";
import { makeStyles } from "@mui/styles";
import { OverlayView } from "@react-google-maps/api";
import LatLngLiteral = google.maps.LatLngLiteral;

const useStyles = makeStyles({
  tooltip: {
    position: "relative",
    right: "calc(100% / 2)",
    filter: "drop-shadow(0 0 5px rgba(0,0,0,0.2));",
  },
  tooltipContent: {
    position: "absolute",
    bottom: "16px",
    transform: "translate(-50%)",
    padding: "8px",
    fontSize: "1rem",
    backgroundColor: "white",
    borderRadius: "4px",
    zIndex: "2",
  },
  tooltipArrow: {
    width: "32px",
    height: "32px",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "4px",
    transform: "translate(-50%) rotate(45deg)",
    left: "50%",
    bottom: "calc(0.2071 * 32px)",
  },
});

interface MapTooltipProps {
  location: LatLngLiteral;
  hoverDistance?: number | string;
}

export const MapTooltip: React.FC<MapTooltipProps> = (props) => {
  const styles = useStyles();
  return (
    <OverlayView
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={props.location}
    >
      <div
        className={styles.tooltip}
        style={{ bottom: props.hoverDistance ?? "8px" }}
      >
        <div className={styles.tooltipArrow} />
        <div className={styles.tooltipContent}>
          <>{props.children}</>
        </div>
      </div>
    </OverlayView>
  );
};
