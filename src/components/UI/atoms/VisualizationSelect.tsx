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
  backgroundColor: "white",
  borderRadius: "5px",
  padding: "5px 10px 5px 10px",

  "& .MuiSelect-select": {
    fontWeight: "bold",

    "&:focus": { backgroundColor: "white" },
  },
}));

export const VisualizationSelect: React.FC<VisualizationSelectProps> = (
  props
) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 240 }}>
      <Select
        autoWidth={true}
        defaultValue={props.visualizations[0]}
        input={<BootstrapInput />}
        disableUnderline
        onChange={(e) => {
          const selectedVisualization = e.target.value;
          props.setVisualization(selectedVisualization);
        }}
      >
        {props.visualizations.map((visualization) => (
          <MenuItem value={visualization} sx={{ minWidth: 240 }}>
            {visualization}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
