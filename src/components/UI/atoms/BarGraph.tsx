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
import { makeStyles } from "@mui/styles";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarGraphProps {
  data?: any;
  xAxisTitle: string;
  yAxisTitle: string;
}

const useStyles = makeStyles({
  parent: {
    position: "relative",
    height: "575px",
    zIndex: 0,
  },
  backdrop: {
    position: "absolute",
  },
});

export const BarGraph: React.FC<BarGraphProps> = (props) => {
  const styles = useStyles();

  const labels: any[] = [];
  const data: any[] = [];
  const [isEmpty, setIsEmpty] = React.useState(false);

  props.data.map((datum: any) => {
    labels.push(datum.x);
    data.push(datum.y);
  });

  console.log(labels);
  console.log(data);

  useEffect(() => {
    if (data.length === 0) {
      console.log("data is empty", data);
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
      <div className={styles.parent}>
        <Backdrop className={styles.backdrop} open={isEmpty}>
          <EmptyDataMessage />
        </Backdrop>
        <Bar data={barData} options={options} />
      </div>
    </>
  );
};
