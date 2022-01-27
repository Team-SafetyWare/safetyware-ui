import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { HorizontalColumn } from "../atoms/HorizontalColumn";

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

export const DashboardSummary = (): JSX.Element => {
  const [state, setState] = useState([
    {
      summaryName: "New Location Updates",
      summaryNumber: "2",
      summaryTileIcon: <ExploreOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      summaryName: "New Incidents",
      summaryNumber: "3",
      summaryTileIcon: <BarChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      summaryName: "New Gas Readings",
      summaryNumber: "0",
      summaryTileIcon: <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
  ]);

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
