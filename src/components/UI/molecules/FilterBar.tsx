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
import { Box } from "@mui/system";

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
  closeable?: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles({
  formControl: {
    width: "100%",
  },
  button: {
    height: "56px",
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

  const showFullLabels = useMediaQuery(theme.breakpoints.not("lg"));

  const maxDateTime = tomorrow();

  const layoutSx = {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    alignItems: "center",
  };

  const labelSx = {
    fontWeight: "bold",
    marginRight: { xs: 0, lg: "8px" },
    marginBottom: { xs: "8px", lg: 0 },
    whiteSpace: "nowrap",
  };

  const styles = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item lg={3} xs={12}>
        <Box sx={layoutSx}>
          {showFullLabels && <Box sx={labelSx}>{START_DATE_LABEL}</Box>}
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                label={(!showFullLabels && START_DATE_LABEL) || undefined}
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.minTimestamp || null}
                onChange={minTimestampChanged}
                maxDateTime={maxDateTime}
              />
            </FormControl>
          </div>
        </Box>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Box sx={layoutSx}>
          {showFullLabels && <Box sx={labelSx}>{END_DATE_LABEL}</Box>}
          <div className={styles.formControl}>
            <FormControl fullWidth>
              <DateTimePicker
                label={(!showFullLabels && END_DATE_LABEL) || undefined}
                renderInput={(props) => <TextField {...props} />}
                value={props.filter.maxTimestamp || null}
                onChange={maxTimestampChanged}
                maxDateTime={maxDateTime}
              />
            </FormControl>
          </div>
        </Box>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Box sx={layoutSx}>
          {showFullLabels && <Box sx={labelSx}>{PERSON_LABEL}</Box>}
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
        </Box>
      </Grid>
      <Grid item lg={true} xs={12} container justifyContent="flex-end">
        <Button
          sx={{ width: { xs: "100%", lg: "192px" } }}
          className={styles.button}
          variant="contained"
          disableElevation={true}
          onClick={resetPressed}
        >
          Reset
        </Button>
      </Grid>
      {props.closeable && (
        <Grid item xs={12} container>
          <Button
            sx={{ width: { xs: "100%" } }}
            className={styles.button}
            variant="outlined"
            color="inherit"
            disableElevation={true}
            onClick={props.onClose}
          >
            Close
          </Button>
        </Grid>
      )}
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
