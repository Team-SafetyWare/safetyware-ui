import { makeStyles } from "@mui/styles";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import React from "react";
import { Card, CardContent } from "@mui/material";

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
  shake: {
    animation: "$shake .25s infinite",
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
    <Card
      className={props.editDashboardMode ? styles.shake : undefined}
      sx={{
        height: "100%",
        cursor: props.editDashboardMode ? "grab" : "default",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div className={styles.summaryInfo}>
          {summaryTable[props.summaryTileIcon as keyof SummaryTable]}
          <p className={styles.summaryName}>{props.summaryName}:</p>
        </div>
        <p className={styles.summaryNumber}>{props.summaryNumber}</p>
        <p className={styles.summaryUnit}>Since Yesterday</p>
      </CardContent>
    </Card>
  );
};
