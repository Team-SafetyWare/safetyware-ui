import { useQuery } from "@apollo/client";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React from "react";
import { getCurrentUser } from "../../../index";
import { setGasName, setGasPersonId } from "../../../store/slices/gasPageSlice";
import {
  setIncidentName,
  setIncidentPersonId,
} from "../../../store/slices/incidentPageSlice";
import { useAppDispatch } from "../../../store/store";
import { GET_PERSONS } from "../../../util/queryService";
import { gasesPageLabel } from "../organisms/Gases";
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
  const user = getCurrentUser();

  const { data: personData } = useQuery(GET_PERSONS, {
    variables: { companyId: user?.company.id },
  });

  const people: any[] = personData?.company.people ?? [];

  function getMenuItemPerson(person: any) {
    return (
      <MenuItem
        value={person}
        onClick={() => updateNameAndIdFilter(person.name, person.id)}
      >
        {person.name}
      </MenuItem>
    );
  }

  function updateNameAndIdFilter(name: string, id: string) {
    switch (label) {
      case incidentPageLabel:
        dispatch(setIncidentName(name));
        dispatch(setIncidentPersonId(id));
        break;
      case gasesPageLabel:
        dispatch(setGasName(name));
        dispatch(setGasPersonId(id));
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
