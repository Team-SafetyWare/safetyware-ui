import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamInfoProps {}

const useStyles = makeStyles({
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  teamSelect: {},
});

export const TeamInfo: React.FC<TeamInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          className={styles.teamSelect}
          id="demo-simple-select-standard"
          defaultValue={10}
          disableUnderline
          //   value={age}
          //   onChange={handleChange}
        >
          <MenuItem value={10}>Team 123-ABC-456</MenuItem>
          <MenuItem value={20}>Team 987-ZYX-321</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
