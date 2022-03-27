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
  summaryWidgets: any;
  editSummaryWidgets: any;
  editDashboardMode: boolean;
  saveState: any;
}

interface numberTable {
  NewLocationUpdates: any;
  NewIncidents: any;
  NewGasReadings: any;
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

  const [summaryValues, setSummaryValues] = useState({
    NewLocationUpdates: "-",
    NewIncidents: "-",
    NewGasReadings: "-",
  });

  useEffect(() => {
    setSummaryValues({
      NewLocationUpdates: locationCount.toString(),
      NewIncidents: incidentCount.toString(),
      NewGasReadings: gasCount.toString(),
    });
  }, [locationCount, incidentCount, gasCount]);

  const onChange = (sourceId: any, sourceIndex: any, targetIndex: any) => {
    const nextState = swap(props.summaryWidgets, sourceIndex, targetIndex);
    props.editSummaryWidgets(nextState);
    props.saveState();
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
          {props.summaryWidgets.map((widget: any) => (
            <GridItem
              key={widget.summaryName}
              className={styles.summaryTileContainer}
            >
              <DashboardSummaryTile
                summaryTileIcon={widget.summary}
                summaryName={widget.summaryName}
                summaryNumber={
                  summaryValues[widget.summary as keyof numberTable]
                }
                editDashboardMode={props.editDashboardMode}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};
