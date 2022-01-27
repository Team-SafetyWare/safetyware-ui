import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { makeStyles } from "@mui/styles";
import React from "react";
import { DashboardSummaryTile } from "../atoms/DashboardSummaryTile";

const useStyles = makeStyles({
  pageInfo: {
    width: "100%",
    display: "flex",
  },
  summaryFirst: {
    width: "33%",
    marginRight: "7.5px",
  },
  summarySecond: {
    width: " 33%",
    marginLeft: "7.5px",
    marginRight: "7.5px",
  },
  summaryThird: {
    width: "33%",
    marginLeft: "7.5px",
  },
});

export const DashboardSummary: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.pageInfo}>
        <div className={styles.summaryFirst}>
          <DashboardSummaryTile
            summaryTileIcon={<ExploreOutlinedIcon style={{ fontSize: 42 }} />}
            summaryName={"New Location Updates"}
            summaryNumber={"3"}
          />
        </div>
        <div className={styles.summarySecond}>
          <DashboardSummaryTile
            summaryTileIcon={<BarChartOutlinedIcon style={{ fontSize: 42 }} />}
            summaryName={"New Incidents"}
            summaryNumber={"2"}
          />
        </div>
        <div className={styles.summarySecond}>
          <DashboardSummaryTile
            summaryTileIcon={
              <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />
            }
            summaryName={"New Gas Readings"}
            summaryNumber={"0"}
          />
        </div>
      </div>
    </>
  );
};
