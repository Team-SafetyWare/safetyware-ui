import React, { useCallback, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { Grid, Select, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  CompanyPeopleData,
  Person,
  useCompanyPeople,
} from "../../../util/queryService";
import { getCurrentUser, sortPeople } from "../../../index";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

export interface Filter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
  person?: Person;
}

interface FilterDialogProps {
  filter: Filter;
  onChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

const useStyles = makeStyles({
  horizontalLayout: {
    display: "flex",
    flexDirection: "row",
  },
  formControl: {
    width: "288px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "8px",
  },
  resetButton: {
    height: "56px",
    width: "192px",
    textTransform: "none",
  },
});

export const FilterBar: React.FC<FilterDialogProps> = (props) => {
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

  const resetPressed = useCallback(() => {
    props.onChange(() => ({}));
  }, [props.onChange]);

  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <div className={styles.horizontalLayout}>
          <p className={styles.label}>Start Date</p>
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.minTimestamp || null}
                onChange={minTimestampChanged}
              />
            </FormControl>
          </div>
        </div>
      </Grid>
      <Grid item>
        <div className={styles.horizontalLayout}>
          <p className={styles.label}>End Date</p>
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.maxTimestamp || null}
                onChange={maxTimestampChanged}
              />
            </FormControl>
          </div>
        </div>
      </Grid>
      <Grid item>
        <div className={styles.horizontalLayout}>
          <p className={styles.label}>Person</p>
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <Select
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
        </div>
      </Grid>
      <Grid item xs={true} container justifyContent="flex-end">
        <Button
          className={styles.resetButton}
          variant="contained"
          disableElevation={true}
          onClick={resetPressed}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};

const intoPeople = (peopleData: CompanyPeopleData): Person[] =>
  sortPeople(peopleData.company.people);
