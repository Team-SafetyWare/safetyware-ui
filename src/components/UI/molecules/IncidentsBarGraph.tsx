import React from "react";
import { Filter } from "./FilterBar";
import { BarGraph } from "../atoms/BarGraph";

export const X_AXIS_TITLE = "Incident Type";
export const Y_AXIS_TITLE = "Occurrences";

interface IncidentsBarGraphProps {
  filter?: Filter;
}

export const IncidentsBarGraph: React.FC<IncidentsBarGraphProps> = (props) => {
  const graphData = [
    { x: "a", y: "12" },
    { x: "b", y: "8" },
  ];

  return (
    <BarGraph
      data={graphData}
      xAxisTitle={X_AXIS_TITLE}
      yAxisTitle={Y_AXIS_TITLE}
    />
  );
};
