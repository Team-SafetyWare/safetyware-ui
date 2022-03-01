import React from "react";
import { FlexibleXYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

interface BarGraphWidgetProps {
  data?: any;
}

export const BarGraphWidget: React.FC<BarGraphWidgetProps> = (props) => {
  const data = props.data;

  return (
    <FlexibleXYPlot color="#ad172b">
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} barWidth={1} />
    </FlexibleXYPlot>
  );
};
