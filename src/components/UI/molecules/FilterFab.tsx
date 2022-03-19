import React from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Fab } from "@mui/material";

interface FilterFabProps {
  onClick?: () => void;
}

export const FilterFab: React.FC<FilterFabProps> = (props) => {
  return (
    <Fab
      sx={{
        zIndex: 2,
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
      color={"primary"}
      onClick={props.onClick}
    >
      <FilterAltIcon sx={{ color: "white" }} />
    </Fab>
  );
};
