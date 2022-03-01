import React from "react";
import { FlexibleXYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

interface BarGraphProps {
  data?: any;
}

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const data = props.data;

  return (
    <FlexibleXYPlot xType="ordinal" color="#ad172b">
      <XAxis />
      <YAxis tickFormat={(val) => (Math.round(val) === val ? val : "")} />
      <VerticalBarSeries data={data} barWidth={0.75} />
    </FlexibleXYPlot>
  );
};
