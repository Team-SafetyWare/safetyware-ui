import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamInfoProps {}

const useStyles = makeStyles({
  teamSelect: {},
  teamTable: {
    border: "1px solid black",
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  tableHeader: {
    border: "1px solid black",
  },
  tableRow: {
    border: "1px solid black",
  },
  tableColumn: {
    border: "1px solid black",
    padding: "10px",
  },
});

export const TeamInfo: React.FC<TeamInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.teamSelect}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            defaultValue={10}
            disableUnderline
            //   value={team}
            //   onChange={handleChange}
          >
            <MenuItem value={10}>Team 123-ABC-456</MenuItem>
            <MenuItem value={20}>Team 987-ZYX-321</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <table className={styles.teamTable}>
          <tr className={styles.tableHeader}>
            <td className={styles.tableColumn}>Member</td>
            <td className={styles.tableColumn}>Email</td>
            <td className={styles.tableColumn}>Role</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableColumn}>Jane Doe (You)</td>
            <td className={styles.tableColumn}>jane.doe@blackline.ca</td>
            <td className={styles.tableColumn}>Manager</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableColumn}>Jeff Davids</td>
            <td className={styles.tableColumn}>jeff.davids@blackline.ca</td>
            <td className={styles.tableColumn}>Member</td>
          </tr>
          <tr className={styles.tableRow}>
            <td className={styles.tableColumn}>John Hanley</td>
            <td className={styles.tableColumn}>john.hanley@blackline.ca</td>
            <td className={styles.tableColumn}>Member</td>
          </tr>
        </table>
      </div>
    </>
  );
};
