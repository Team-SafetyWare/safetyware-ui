import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { HorizontalColumn } from "../atoms/HorizontalColumn";

const useStyles = makeStyles({
  pageInfo: {
    width: "100%",
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

interface Item {
  id: string;
  content: string;
  name: string;
  number: string;
  summaryTileIcon: any;
}

// a little function to help us with reordering the result
const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const DashboardSummary = (): JSX.Element => {
  const [state, setState] = useState([
    {
      id: "1",
      content: "hello",
      name: "New Location Updates",
      number: "2",
      summaryTileIcon: <ExploreOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      id: "2",
      content: "hi",
      name: "New Incidents",
      number: "3",
      summaryTileIcon: <BarChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
    {
      id: "3",
      content: "sup",
      name: "New Gas Readings",
      number: "0",
      summaryTileIcon: <BubbleChartOutlinedIcon style={{ fontSize: 42 }} />,
    },
  ]);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Item[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(items);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HorizontalColumn state={state} />
    </DragDropContext>
  );
};
