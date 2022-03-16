import React, { useCallback } from "react";
import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

export interface Filter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
  personId?: string;
}

interface FilterDialogProps {
  filter: Filter;
  onChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

export const FilterDialog: React.FC<FilterDialogProps> = (props) => {
  const setMinTimestamp = useCallback(
    (value: Date | null | undefined) => {
      props.onChange((prevFilter) => ({
        ...prevFilter,
        minTimestamp: value || undefined,
      }));
    },
    [props.onChange]
  );

  const setMaxTimestamp = useCallback(
    (value: Date | null | undefined) => {
      props.onChange((prevFilter) => ({
        ...prevFilter,
        maxTimestamp: value || undefined,
      }));
    },
    [props.onChange]
  );

  return (
    <div>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="From"
        value={props.filter.minTimestamp || null}
        onChange={(newValue) => {
          setMinTimestamp(newValue);
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="To"
        value={props.filter.maxTimestamp || null}
        onChange={(newValue) => {
          setMaxTimestamp(newValue);
        }}
      />
    </div>
  );
};
