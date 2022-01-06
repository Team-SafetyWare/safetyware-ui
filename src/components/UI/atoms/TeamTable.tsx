import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamTableProps {}

const useStyles = makeStyles({
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

export const TeamTable: React.FC<TeamTableProps> = (props) => {
  const styles = useStyles();

  return (
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
  );
};
