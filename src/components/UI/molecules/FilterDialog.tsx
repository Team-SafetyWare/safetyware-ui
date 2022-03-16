import React, { useCallback, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { InputLabel, Select, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  CompanyPeopleData,
  Person,
  useCompanyPeople,
} from "../../../util/queryService";
import { getCurrentUser } from "../../../index";

export interface Filter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
  person?: Person;
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

  const people: Person[] = (peopleData && intoPeople(peopleData)) || [];
  const [allPerson] = useState<Person>({
    id: "All",
    name: "All",
  });

  const personChanged = useCallback(
    (event: SelectChangeEvent) => {
      event.preventDefault();
      let person: Person | undefined = event.target.value as unknown as Person;
      if (person === allPerson) {
        person = undefined;
      }
      props.onChange((prevFilter) => ({
        ...prevFilter,
        person: person,
      }));
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
        <Select
          label={selectPersonLabel}
          onChange={personChanged}
          value={(props.filter.person as any) || allPerson}
        >
          {[allPerson].concat(people).map((person) => (
            <MenuItem key={person.id} value={person as any}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const intoPeople = (peopleData: CompanyPeopleData): Person[] =>
  peopleData.company.people
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
