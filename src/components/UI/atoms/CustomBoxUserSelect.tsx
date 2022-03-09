import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PERSONS } from "../../../util/queryService";
import { useAppDispatch } from "../../../store/store";
import { setIncidentName } from "../../../store/slices/incidentPageSlice";
import { incidentPageLabel } from "../organisms/Incidents";

interface CustomBoxUserSelectProps {
  view?: string;
  user?: string;
  label?: string;
}

const useStyles = makeStyles({
  label: {
    fontSize: "11px",
  },
});

export const CustomBoxUserSelect: React.FC<CustomBoxUserSelectProps> = (
  props
) => {
  useStyles();
  const dispatch = useAppDispatch();
  const label = props.label;

  const [people, updatePeople] = useState<string[]>([]);
  const { loading, data } = useQuery(GET_PERSONS);

  useEffect(() => {
    updatePeople([]);
    if (!loading && data) {
      data.people.map((person: any) => {
        updatePeople((people) => [...people, person.name]);
      });
    }
  }, [loading, data]);

  function getMenuItemPerson(name: string) {
    return (
      <MenuItem value={name} onClick={() => updateNameFilter(name)}>
        {name}
      </MenuItem>
    );
  }

  function updateNameFilter(name: string) {
    switch (label) {
      case incidentPageLabel:
        dispatch(setIncidentName(name));
        break;
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel id="radio-group">View</FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-group"
          defaultValue={props.view}
          name="radio-buttons-group"
        >
          <FormControlLabel value="User" control={<Radio />} label="User" />
          <FormControlLabel value="Team" control={<Radio />} label="Team" />
          <FormControlLabel
            value="Organization"
            control={<Radio />}
            label="Organization"
          />
        </RadioGroup>
      </FormControl>
      <div></div>
      <div></div>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Select</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          label="Select"
          defaultValue={["All"]}
        >
          {getMenuItemPerson("All")}
          {people.map((person: string) => getMenuItemPerson(person))}
        </Select>
      </FormControl>
    </>
  );
};
