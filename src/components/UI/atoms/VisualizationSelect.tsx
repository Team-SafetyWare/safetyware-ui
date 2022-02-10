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
        {props.visualizations.map((visualization) => (
          <MenuItem value={visualization}>{visualization}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
