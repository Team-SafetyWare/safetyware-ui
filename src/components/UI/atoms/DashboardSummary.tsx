import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  pageInfo: {
    width: "100%",
    display: "flex",
  },
  summaryBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: "200px",
    width: "33%",
    padding: "17.5px",
    borderRadius: "25px",
  },
  summaryFirst: {
    marginRight: "7.5px",
  },
  summarySecond: {
    marginLeft: "7.5px",
    marginRight: "7.5px",
  },
  summaryThird: {
    marginLeft: "7.5px",
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

export const DashboardSummary: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.pageInfo}>
        <div className={`${styles.summaryBox} ${styles.summaryFirst}`}>
          <div className={styles.summaryInfo}>
            <ExploreOutlinedIcon style={{ fontSize: 42 }} />
            <p className={styles.summaryName}>New Location Updates:</p>
          </div>
          <p className={styles.summaryNumber}>3</p>
          <p className={styles.summaryUnit}>Since Yesterday</p>
        </div>
        <div className={`${styles.summaryBox} ${styles.summarySecond}`}>
          <div className={styles.summaryInfo}>
            <BarChartOutlinedIcon style={{ fontSize: 42 }} />
            <p className={styles.summaryName}>New Incidents:</p>
          </div>
          <p className={styles.summaryNumber}>2</p>
          <p className={styles.summaryUnit}>Since Yesterday</p>
        </div>
        <div className={`${styles.summaryBox} ${styles.summaryThird}`}>
          <div className={styles.summaryInfo}>
            <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />
            <p className={styles.summaryName}>New Gas Readings:</p>
          </div>
          <p className={styles.summaryNumber}>0</p>
          <p className={styles.summaryUnit}>Since Yesterday</p>
        </div>
      </div>
    </>
  );
};
