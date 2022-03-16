import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import theme from "../../../Theme";
import EmptyDataMessage from "../atoms/EmptyDataMessage";
import Backdrop from "@mui/material/Backdrop";
import OverlayStyles from "../../styling/OverlayStyles";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarGraphProps {
  data?: any;
  xAxisTitle: string;
  yAxisTitle: string;
}

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const overlayStyles = OverlayStyles();

  const labels: any[] = [];
  const data: any[] = [];
  const [isEmpty, setIsEmpty] = React.useState(false);

  props.data.map((datum: any) => {
    labels.push(datum.x);
    data.push(datum.y);
  });

  useEffect(() => {
    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data]);

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

  return (
    <>
      <div className={overlayStyles.parent}>
        <Backdrop className={overlayStyles.backdrop} open={isEmpty}>
          <EmptyDataMessage />
        </Backdrop>
        <Bar data={barData} options={options} />
      </div>
    </>
  );
};
