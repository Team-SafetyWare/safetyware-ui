import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { DashboardSummaryTile } from "../atoms/DashboardSummaryTile";
import {
  useCompanyLocations,
  useCompanyIncidents,
  useCompanyGasReadings,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { Filter } from "./FilterBar";

interface DashboardSummaryTileProps {
  editDashboardMode: boolean;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    height: "200px",
  },
  summaryTileContainer: {
    paddingTop: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  summaryDropzone: {
    flex: 1,
    height: "100%",
  },
});

const filter: Filter = {
  // 2 days ago since no 24 hour data
  minTimestamp: new Date(Date.now() - 2 * 86400000),
  maxTimestamp: new Date(),
};

export const DashboardSummary: React.FC<DashboardSummaryTileProps> = (
  props
) => {
  const styles = useStyles();
  const user = getCurrentUser();

  const locationData = useCompanyLocations({
    companyId: user?.company.id || "",
    filter: {
      minTimestamp: filter.minTimestamp,
      maxTimestamp: filter.maxTimestamp,
    },
  });

  let locationCount = 0;
  if (locationData.data) {
    for (const person of locationData.data.company.people) {
      locationCount += person.locationReadings.length;
    }
  }

  const incidentData = useCompanyIncidents({
    companyId: user?.company.id || "",
    filter: {
      minTimestamp: filter.minTimestamp,
      maxTimestamp: filter.maxTimestamp,
    },
  });

  let incidentCount = 0;
  if (incidentData.data) {
    for (const person of incidentData.data.company.people) {
      incidentCount += person.incidents.length;
    }
  }

  const gasData = useCompanyGasReadings({
    companyId: user?.company.id || "",
    filter: {
      minTimestamp: filter.minTimestamp,
      maxTimestamp: filter.maxTimestamp,
    },
  });

  let gasCount = 0;
  if (gasData.data) {
    for (const person of gasData.data.company.people) {
      gasCount += person.gasReadings.length;
    }
  }

  const [state, setState] = useState([
    {
      summaryName: "New Location Updates",
      summaryNumber: locationCount.toString(),
      summaryTileIcon: <ExploreOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      summaryName: "New Incidents",
      summaryNumber: incidentCount.toString(),
      summaryTileIcon: <BarChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      summaryName: "New Gas Readings",
      summaryNumber: "0",
      summaryTileIcon: <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
  ]);

  useEffect(() => {
    setState([
      {
        summaryName: state[0].summaryName,
        summaryNumber: locationCount.toString(),
        summaryTileIcon: state[0].summaryTileIcon,
      },
      {
        summaryName: state[1].summaryName,
        summaryNumber: incidentCount.toString(),
        summaryTileIcon: state[1].summaryTileIcon,
      },
      {
        summaryName: state[2].summaryName,
        summaryNumber: gasCount.toString(),
        summaryTileIcon: state[2].summaryTileIcon,
      },
    ]);
  }, [locationCount, incidentCount, gasCount]);

  const onChange = (sourceId: any, sourceIndex: any, targetIndex: any) => {
    const nextState = swap(state, sourceIndex, targetIndex);
    setState(nextState);
  };

  return (
    <GridContextProvider onChange={onChange}>
      <div className={styles.container}>
        <GridDropZone
          className={styles.summaryDropzone}
          id="summary-drop-zone"
          boxesPerRow={3}
          rowHeight={200}
          disableDrag={!props.editDashboardMode}
        >
          {state.map((widget: any) => (
            <GridItem
              key={widget.summaryName}
              className={styles.summaryTileContainer}
            >
              <DashboardSummaryTile
                summaryTileIcon={widget.summaryTileIcon}
                summaryName={widget.summaryName}
                summaryNumber={widget.summaryNumber}
                editDashboardMode={props.editDashboardMode}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};
