import { makeStyles } from "@mui/styles";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import React from "react";

interface DashboardSummaryTileProps {
  summaryTileIcon?: any;
  summaryName?: string;
  summaryNumber?: any;
  editDashboardMode?: boolean;
}

interface SummaryTable {
  NewLocationUpdates: any;
  NewIncidents: any;
  NewGasReadings: any;
}

const useStyles = makeStyles({
  summaryTile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
    cursor: "default",
  },
  summaryTileAnimated: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "100%",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0px 16px 16px 16px",
    animation: "$shake .25s infinite",
    cursor: "grab",
  },
  summaryInfo: {
    display: "flex",
    alignItems: "center",
  },
  summaryName: {
    margin: "12px 0px 12px 8px",
    fontWeight: "bold",
    fontSize: "24px",
  },
  summaryNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: 0,
  },
  summaryUnit: {
    margin: 0,
  },
  "@keyframes shake": {
    "0%": { transform: "translate(-1px, 0px) rotate(.3deg)" },
    "50%": { transform: "translate(1px, 0px) rotate(-.3deg) " },
  },
});

export const DashboardSummaryTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();

  const summaryTable = {
    NewLocationUpdates: <ExploreOutlinedIcon style={{ fontSize: 42 }} />,
    NewIncidents: <BarChartOutlinedIcon style={{ fontSize: 42 }} />,
    NewGasReadings: <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />,
  };

  return (
    <div
      className={
        props.editDashboardMode
          ? styles.summaryTileAnimated
          : styles.summaryTile
      }
    >
      <div className={styles.summaryInfo}>
        {summaryTable[props.summaryTileIcon as keyof SummaryTable]}
        <p className={styles.summaryName}>{props.summaryName}:</p>
      </div>
      <p className={styles.summaryNumber}>{props.summaryNumber}</p>
      <p className={styles.summaryUnit}>Since Yesterday</p>
    </div>
  );
};
