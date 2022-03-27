import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { HorizontalColumn } from "../atoms/HorizontalColumn";
import {
  useCompanyLocations,
  useCompanyIncidents,
  useCompanyGasReadings,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";
import { Filter } from "./FilterBar";

interface DashboardSummaryTileData {
  summaryName: string;
  summaryNumber: string;
  summaryTileIcon: any;
}

const reorder = (
  list: DashboardSummaryTileData[],
  startIndex: number,
  endIndex: number
): DashboardSummaryTileData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const filter: Filter = {
  // 2 days ago since no 24 hour data
  minTimestamp: new Date(Date.now() - 2 * 86400000),
  maxTimestamp: new Date(),
};

export const DashboardSummary = (): JSX.Element => {
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

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: DashboardSummaryTileData[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HorizontalColumn state={state} />
    </DragDropContext>
  );
};
