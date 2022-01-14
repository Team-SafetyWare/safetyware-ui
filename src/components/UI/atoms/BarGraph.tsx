import React from "react";
import { VerticalBarSeries, XAxis, XYPlot, YAxis } from "react-vis";

interface BarGraphProps {
  data?: any;
}

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const data = props.data;

  return (
    <XYPlot height={400} width={800}>
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} barWidth={1} />
    </XYPlot>
  );
};
