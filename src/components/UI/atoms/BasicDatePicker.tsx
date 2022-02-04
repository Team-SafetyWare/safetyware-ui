import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React from "react";

interface BasicDatePickerProps {
  date?: any;
}

const useStyles = makeStyles({
  label: { fontSize: "10px" },
  text: { fontSize: "10px" },
});

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null);
  const styles = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date"
        className={styles.text}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField className={styles.text} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}
