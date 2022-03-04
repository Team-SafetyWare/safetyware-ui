import {makeStyles} from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import {incidentPageLabel} from "../organisms/Incidents";


interface CustomBoxDatesProps {
    pageLabel?: string;
    startDate?: any;
    endDate?: any;
}

const useStyles = makeStyles({
  text: { fontSize: "10px" },
});

export const incidentPageStartDate = "incidentPageStartDate"
export const incidentPageEndDate = "incidentPageEndDate"
export const locationPageStartDate = "locationPageStartDate"
export const locationPageEndDate = "locationPageEndDate"

export const CustomBoxDates: React.FC<CustomBoxDatesProps> = (props) => {
    const styles = useStyles();
    const label = props.pageLabel;

    function getStartDateLabel() {
        if (label == incidentPageLabel) {
            return incidentPageStartDate
        } else {
            return locationPageStartDate
        }
    }

    function getEndDateLabel() {
        if (label == incidentPageLabel) {
            return incidentPageEndDate
        } else {
            return locationPageEndDate
        }
    }

    return (
        <>
            <p> Start Date </p>
            <BasicDatePicker label={getStartDateLabel()}/>
            <p> End Date </p>
            <BasicDatePicker label={getEndDateLabel()}/>
        </>
    );
};
