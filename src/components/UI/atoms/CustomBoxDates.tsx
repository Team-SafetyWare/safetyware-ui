import {makeStyles} from "@mui/styles";
import React from "react";
import BasicDatePicker from "../atoms/BasicDatePicker";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIncidentPageEndDate, selectIncidentPageStartDate} from "../../../store/slices/incidentPageSlice";
import {incidentPageLabel} from "../organisms/Incidents";
import {locationPageLabel} from "../organisms/Locations";
import {selectLocationPageEndDate, selectLocationPageStartDate} from "../../../store/slices/locationPageSlice";


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
export const locationPageStartDate = "locationPageEndDate"
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
