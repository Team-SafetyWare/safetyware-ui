import { makeStyles } from "@mui/styles";
import React from "react";

interface DashboardSummaryTileProps {
  summaryTileIcon?: any;
  summaryName?: string;
  summaryNumber?: string;
}

const useStyles = makeStyles({
  summaryTile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "200px",
    width: "100%",
    padding: "17.5px",
    borderRadius: "25px",
  },
  summaryInfo: {
    display: "flex",
    alignItems: "center",
  },
  summaryName: {
    margin: "0 0 0 10px",
  },
  summaryNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: 0,
  },
  summaryUnit: {
    margin: 0,
  },
});

export const DashboardSummaryTile: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.summaryTile}>
        <div className={styles.summaryInfo}>
          {props.summaryTileIcon}
          <p className={styles.summaryName}>{props.summaryName}:</p>
        </div>
        <p className={styles.summaryNumber}>{props.summaryNumber}</p>
        <p className={styles.summaryUnit}>Since Yesterday</p>
      </div>
    </>
  );
};
