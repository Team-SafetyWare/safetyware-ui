import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {selectIncidentDotMapEndDate, selectIncidentDotMapStartDate, setStartDate} from "../../../store/slices/incidentDotMapSlice";
import {selectIsDashboard, setIsDashboard} from "../../../store/slices/dashboard";

interface BasicDatePickerProps {
    date?: any;
}

export default function BasicDatePicker(props: BasicDatePickerProps) {
    const [value, setValue] = React.useState<Date | null>(null);

        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        );
    }
