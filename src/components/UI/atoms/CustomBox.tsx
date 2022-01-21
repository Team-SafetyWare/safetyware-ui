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
import BasicDatePicker from "./BasicDatePicker";

interface CustomBoxProps {
  view?: any;
  user?: any;
  incidenttype?: any;
}

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "50%",
    width: "18%",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "absolute",
    bottom: "20px",
    right: "20px",
    fontSize: "14px",
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
  },
});

export const CustomBox: React.FC<CustomBoxProps> = (props) => {
  const view = props.view;
  const user = props.user;
  const incidenttype = props.incidenttype;
  const styles = useStyles();

  return (
    <div className={styles.box}>
      <h3>Customize</h3>
      <p>Start Date</p>
      <BasicDatePicker></BasicDatePicker>
      <p>End Date</p>
      <BasicDatePicker></BasicDatePicker>
      <FormControl>
        <FormLabel id="radio-group">View</FormLabel>
        <RadioGroup
          row
          aria-labelledby="radio-group"
          defaultValue={view}
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
          defaultValue={user}
        >
          <MenuItem value={"PersonA"}>Person A</MenuItem>
          <MenuItem value={"PersonB"}>Person B</MenuItem>
          <MenuItem value={"PersonC"}>Person C</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel id="incident-radio-group">Incident</FormLabel>
        <RadioGroup
          style={{
            width: "100%",
            height: "auto",
            alignContent: "center",
            display: "inline-block",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
          row
          aria-labelledby="incident-radio-group"
          defaultValue={incidenttype}
          name="incident-radio-buttons-group"
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel
            value="LowBattery"
            control={<Radio />}
            label="Low Battery"
          />
          <FormControlLabel
            value="LostSignal"
            control={<Radio />}
            label="Lost Signal"
          />
          <FormControlLabel
            value="GasWarning"
            control={<Radio />}
            label="Gas Warning"
          />
          <FormControlLabel
            value="UserFall"
            control={<Radio />}
            label="User Fall"
          />
          <FormControlLabel
            value="LatchPulled"
            control={<Radio />}
            label="Latch Pulled"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
