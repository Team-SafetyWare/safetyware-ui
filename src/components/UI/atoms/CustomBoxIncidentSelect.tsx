import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles } from "@mui/styles";
import React from "react";


interface CustomBoxIncidentSelectProps {
  incidentType?: string;
}

const useStyles = makeStyles({});

export const CustomBoxIncidentSelect: React.FC<CustomBoxIncidentSelectProps> = (
  props
) => {
  const incidentType = props.incidentType;
  const styles = useStyles();

  return (
    <>
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
          defaultValue={incidentType}
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
    </>
  );
};
