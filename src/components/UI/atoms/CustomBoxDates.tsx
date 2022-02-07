import { makeStyles } from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIsDashboard} from "../../../store/slices/dashboard";
import {selectIncidentDotMapEndDate, selectIncidentDotMapStartDate} from "../../../store/slices/incidentDotMapSlice";

interface CustomBoxDatesProps {
  startDate?: any;
  endDate?: any;
}

const useStyles = makeStyles({});

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
  const styles = useStyles();

    const dispatch = useAppDispatch();
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

  return (
    <>
      <h4> Start Date </h4>
      <BasicDatePicker date={startDate}/>
      <h4> End Date </h4>
      <BasicDatePicker date={endDate}/>
    </>
  );
};
