import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamSelectProps {}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiSelect-select": {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeight: "bold",
  },
}));

const useStyles = makeStyles({ selectBar: { fontWeight: "bold" } });

export const TeamSelect: React.FC<TeamSelectProps> = (props) => {
  const styles = useStyles();

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <Select
        defaultValue={"123-ABC-456"}
        input={<BootstrapInput />}
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
