import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import theme from "../../../Theme";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export interface BarItem {
  x: string;
  y: number;
}

interface BarGraphProps {
  data?: BarItem[];
  xAxisTitle: string;
  yAxisTitle: string;
}

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const labels: string[] = [];
  const data: number[] = [];

  props.data?.map((datum) => {
    labels.push(datum.x);
    data.push(datum.y);
  });

  const barData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: props.xAxisTitle,
        },
      },
      y: {
        grace: 1,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: props.yAxisTitle,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return <Bar data={barData} options={options} />;
};
