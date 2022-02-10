import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import React from "react";

interface VisualizationSelectProps {
  visualizations: string[];
  setVisualization(visualization: string): any;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiSelect-select": {
    fontWeight: "bold",
  },
}));

export const VisualizationSelect: React.FC<VisualizationSelectProps> = (
  props
) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <Select
        defaultValue={props.visualizations[0]}
        input={<BootstrapInput />}
        disableUnderline
        onChange={(e) => {
          const selectedVisualization = e.target.value;
          props.setVisualization(selectedVisualization);
        }}
      >
        <MenuItem value={props.visualizations[0]}>
          {props.visualizations[0]}
        </MenuItem>
        <MenuItem value={props.visualizations[1]}>
          {props.visualizations[1]}
        </MenuItem>
        <MenuItem value={props.visualizations[2]}>
          {props.visualizations[2]}
        </MenuItem>
      </Select>
    </FormControl>
  );
};