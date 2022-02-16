import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {
    selectIncidentDotMapEndDate,
    selectIncidentDotMapStartDate,
    setEndDate,
    setStartDate
} from "../../../store/slices/incidentDotMapSlice";
import {incidentDotMapEndDate, incidentDotMapStartDate} from "./CustomBoxDates";

interface BasicDatePickerProps {
    label?: string;
    date?: any;
}

const useStyles = makeStyles({
    label: { fontSize: "10px" },
    text: { fontSize: "10px" },
});

export default function BasicDatePicker(props: BasicDatePickerProps) {
    const label = props.label
    const [value, setValue] = React.useState<Date | null>(null);
    const styles = useStyles();

    const dispatch = useAppDispatch();

    function changeDate(date: string) {
        switch (label) {
            case incidentDotMapStartDate:
                dispatch(setStartDate(date))
                break;
            case incidentDotMapEndDate:
                dispatch(setEndDate(date))
                break;
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date"
                className={styles.text}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue)
                    if (newValue) {
                        changeDate(new Date(newValue.toDateString()).toString())
                    } else {
                        changeDate("")
                    }
                }}
                renderInput={(params) => <TextField className={styles.text} {...params} />}
            />
        </LocalizationProvider>
    );
}
