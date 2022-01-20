import React from "react";
import { FlexibleXYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

interface BarGraphProps {
  data?: any;
}

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const data = props.data;

  return (
    <FlexibleXYPlot color="#ad172b">
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} barWidth={1} />
    </FlexibleXYPlot>
  );
};
