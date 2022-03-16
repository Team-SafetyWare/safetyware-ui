import React from "react";
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

export const FilterDialog: React.FC = () => {
  const [fromTime, setFromTime] = React.useState<Date | null>(null);
  const [toTime, setToTime] = React.useState<Date | null>(null);

  return (
    <div>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="From"
        value={fromTime}
        onChange={(newValue) => {
          setFromTime(newValue);
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="To"
        value={toTime}
        onChange={(newValue) => {
          setToTime(newValue);
        }}
      />
    </div>
  );
};
