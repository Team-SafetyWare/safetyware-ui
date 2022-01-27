import { makeStyles } from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";

interface CustomBoxDatesProps {
  startDate?: any;
  endDate?: any;
}

const useStyles = makeStyles({});

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
  const startDate = props.startDate;
  const endDate = props.endDate;
  const styles = useStyles();

  return (
    <>
      <h4> Start Date </h4>
      <BasicDatePicker />
      <h4> End Date </h4>
      <BasicDatePicker></BasicDatePicker>
    </>
  );
};
