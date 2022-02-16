import {makeStyles} from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIsDashboard} from "../../../store/slices/dashboard";
import {selectIncidentDotMapEndDate, selectIncidentDotMapStartDate} from "../../../store/slices/incidentDotMapSlice";


interface CustomBoxDatesProps {
    pageLabel?: string;
    startDate?: any;
    endDate?: any;
}

const useStyles = makeStyles({
  text: { fontSize: "10px" },
});

export const incidentDotMapStartDate = "incidentDotMapStartDate"
export const incidentDotMapEndDate = "incidentDotMapEndDate"

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
    const styles = useStyles();

    const label = props.pageLabel;
    const startDate = useAppSelector(selectIncidentDotMapStartDate);
    const endDate = useAppSelector(selectIncidentDotMapEndDate);

    return (
        <>
            <p> Start Date </p>
            <BasicDatePicker date={startDate} label={incidentDotMapStartDate}/>
            <p> End Date </p>
            <BasicDatePicker date={endDate} label={incidentDotMapEndDate}/>
        </>
    );
};
