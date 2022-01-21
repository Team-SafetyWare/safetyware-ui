import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles } from "@mui/styles";
import React from "react";
import BasicDatePicker from "./BasicDatePicker";

const useStyles = makeStyles({
  box: {
    textAlign: "center",
    height: "35%",
    width: "18%",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "absolute",
    bottom: "5px",
    right: "5px",
    fontSize: "14px",
  },
});

export const CustomBox: React.FC = () => {
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
          defaultValue="user"
          name="radio-buttons-group"
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="team" control={<Radio />} label="Team" />
          <FormControlLabel
            value="organization"
            control={<Radio />}
            label="Organization"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
