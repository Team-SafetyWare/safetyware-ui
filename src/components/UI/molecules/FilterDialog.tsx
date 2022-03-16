import React, { useCallback } from "react";
import { DateTimePicker } from "@mui/lab";
import { InputLabel, Select, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useCompanyPeople } from "../../../util/queryService";
import { getCurrentUser } from "../../../index";

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
  const user = getCurrentUser();

  const { data: peopleData } = useCompanyPeople({
    companyId: user?.company.id || "",
  });

  const minTimestampChanged = useCallback(
    (value: Date | null | undefined) => {
      props.onChange((prevFilter) => ({
        ...prevFilter,
        minTimestamp: value || undefined,
      }));
    },
    [props.onChange]
  );

  const maxTimestampChanged = useCallback(
    (value: Date | null | undefined) => {
      props.onChange((prevFilter) => ({
        ...prevFilter,
        maxTimestamp: value || undefined,
      }));
    },
    [props.onChange]
  );

  const personChanged = useCallback(
    (event: SelectChangeEvent) => {
      console.log(event);
    },
    [props.onChange]
  );

  const selectPersonLabel = "Person";

  return (
    <div>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="From"
        value={props.filter.minTimestamp || null}
        onChange={minTimestampChanged}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="To"
        value={props.filter.maxTimestamp || null}
        onChange={maxTimestampChanged}
      />
      <FormControl fullWidth>
        <InputLabel>{selectPersonLabel}</InputLabel>
        <Select label={selectPersonLabel} onChange={personChanged}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
