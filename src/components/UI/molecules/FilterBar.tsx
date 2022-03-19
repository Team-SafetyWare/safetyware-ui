import React, { useCallback, useState } from "react";
import { DateTimePicker } from "@mui/lab";
import {
  Grid,
  InputLabel,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
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
import theme from "../../../Theme";

const START_DATE_LABEL = "Start Date";
const END_DATE_LABEL = "End Date";
const PERSON_LABEL = "Person";

export interface Filter {
  minTimestamp?: Date;
  maxTimestamp?: Date;
  person?: Person;
}

interface FilterBarProps {
  filter: Filter;
  resetFilter?: () => Filter;
  onChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

const useStyles = makeStyles({
  horizontalLayout: {
    display: "flex",
    flexDirection: "row",
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginRight: "8px",
    whiteSpace: "nowrap",
  },
  resetButton: {
    height: "56px",
    width: "192px",
    textTransform: "none",
  },
});

export const FilterBar: React.FC<FilterBarProps> = (props) => {
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

  const selectedPerson: Person =
    (props.filter.person &&
      people.find(
        (person) => props.filter.person && person.id === props.filter.person.id
      )) ||
    allPerson;

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
    props.onChange(props.resetFilter || defaultFilter);
  }, [props.onChange]);

  const showFullLabels = useMediaQuery(theme.breakpoints.up("xl"));

  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item lg={3}>
        <div className={styles.horizontalLayout}>
          {showFullLabels && <p className={styles.label}>{START_DATE_LABEL}</p>}
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                label={(!showFullLabels && START_DATE_LABEL) || undefined}
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.minTimestamp || null}
                onChange={minTimestampChanged}
                maxDateTime={tomorrow()}
              />
            </FormControl>
          </div>
        </div>
      </Grid>
      <Grid item lg={3}>
        <div className={styles.horizontalLayout}>
          {showFullLabels && <p className={styles.label}>{END_DATE_LABEL}</p>}
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                label={(!showFullLabels && END_DATE_LABEL) || undefined}
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.maxTimestamp || null}
                onChange={maxTimestampChanged}
                maxDateTime={tomorrow()}
              />
            </FormControl>
          </div>
        </div>
      </Grid>
      <Grid item lg={3}>
        <div className={styles.horizontalLayout}>
          {showFullLabels && <p className={styles.label}>{PERSON_LABEL}</p>}
          <div className={styles.formControl}>
            <FormControl fullWidth>
              {!showFullLabels && <InputLabel>{PERSON_LABEL}</InputLabel>}
              <Select
                label={(!showFullLabels && PERSON_LABEL) || undefined}
                onChange={personChanged}
                value={selectedPerson as any}
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

export const defaultFilter = (): Filter => ({
  minTimestamp: defaultMinTimestamp(),
  maxTimestamp: defaultMaxTimestamp(),
});

export const defaultMinTimestamp = (): Date => new Date(2022, 2, 6);

export const defaultMaxTimestamp = (): Date => tomorrow();

const tomorrow = (): Date => {
  // Beginning of tomorrow in local time.
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

export const shouldFilterPerson = (filter: Filter): boolean => !!filter.person;
