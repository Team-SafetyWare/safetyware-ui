import { makeStyles } from "@mui/styles";
import React from "react";

interface DashboardSummaryTileProps {
  widgetName?: string;
  widget?: any;
  innerRef?: any;
}

const useStyles = makeStyles({
  widgetTile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "400px",
    width: "100%",
    borderRadius: "25px",
  },
  widgetInfo: {
    display: "flex",
    alignItems: "center",
  },
  widgetName: {
    marginLeft: "10px",
  },
  widget: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
});

export const DashboardWidgetTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.widgetTile}>
        <div className={styles.widgetInfo}>
          <p className={styles.widgetName}>{props.widgetName}:</p>
        </div>
        <div className={styles.widget}>{props.widget}</div>
      </div>
    </>
  );
};
