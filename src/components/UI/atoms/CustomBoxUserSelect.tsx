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

interface CustomBoxUserSelectProps {
  view?: string;
  user?: string;
}

const useStyles = makeStyles({
  label: {
    fontSize: "11px",
  },
});

export const CustomBoxUserSelect: React.FC<CustomBoxUserSelectProps> = (
  props
) => {

  const styles = useStyles();

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
          defaultValue={props.user}
        >
          <MenuItem value={"PersonA"}>Person A</MenuItem>
          <MenuItem value={"PersonB"}>Person B</MenuItem>
          <MenuItem value={"PersonC"}>Person C</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
