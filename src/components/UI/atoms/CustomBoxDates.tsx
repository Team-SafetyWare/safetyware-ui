import { makeStyles } from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";


interface CustomBoxDatesProps {
  startDate?: any;
  endDate?: any;
}

const useStyles = makeStyles({
  text: { fontSize: "10px" },
});

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <p> Start Date </p>
      <BasicDatePicker />
      <p> End Date </p>
      <BasicDatePicker></BasicDatePicker>
    </>
  );
};
