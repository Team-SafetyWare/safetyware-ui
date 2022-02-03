import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { makeStyles } from "@mui/styles";
import React from "react";

interface TeamTableProps {
  userPhoto?: string;
  userName?: string;
  teamData?: string[][][];
}

const useStyles = makeStyles({
  teamTable: {
    border: "1px solid black",
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    marginBottom: "60px",
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
    backgroundColor: "white",
  },
  memberColumn: {
    display: "flex",
    justifyContent: "center",
  },
  memberName: {
    margin: "0 5px",
  },
  memberPicture: {
    height: "24px",
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
        <td className={styles.tableColumn}>
          <div className={styles.memberColumn}>
            <img
              className={styles.memberPicture}
              src={props.userPhoto}
              alt={props.userName}
            />
            <p className={styles.memberName}>{props.userName} (You)</p>
          </div>
        </td>
        <td className={styles.tableColumn}>jane.doe@blackline.ca</td>
        <td className={styles.tableColumn}>Manager</td>
      </tr>

      <tr className={styles.tableRow}>
        <td className={styles.tableColumn}>
          <div className={styles.memberColumn}>
            <AccountCircleOutlinedIcon />
            <p className={styles.memberName}>Jeff Davids</p>
          </div>
        </td>
        <td className={styles.tableColumn}>jeff.davids@blackline.ca</td>
        <td className={styles.tableColumn}>Member</td>
      </tr>
      <tr className={styles.tableRow}>
        <td className={styles.tableColumn}>
          <div className={styles.memberColumn}>
            <AccountCircleOutlinedIcon />
            <p className={styles.memberName}>John Hanley</p>
          </div>
        </td>
        <td className={styles.tableColumn}>john.hanley@blackline.ca</td>
        <td className={styles.tableColumn}>Member</td>
      </tr>
    </table>
  );
};
