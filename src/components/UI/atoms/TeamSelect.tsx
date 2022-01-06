import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamSelectProps {}

const useStyles = makeStyles({});

export const TeamSelect: React.FC<TeamSelectProps> = (props) => {
  const styles = useStyles();

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        defaultValue={"123-ABC-456"}
        disableUnderline
        //   value={team}
        //   onChange={handleChange}
      >
        <MenuItem value={"123-ABC-456"}>Team 123-ABC-456</MenuItem>
        <MenuItem value={"987-ZYX-321"}>Team 987-ZYX-321</MenuItem>
      </Select>
    </FormControl>
  );
};
