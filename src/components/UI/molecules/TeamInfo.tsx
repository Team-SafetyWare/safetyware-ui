import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { TeamSelect } from "../atoms/TeamSelect";
import { TeamTable } from "../atoms/TeamTable";

interface TeamInfoProps {
  userPhoto?: string;
  userName?: string;
  teamData?: string[][][];
}

const useStyles = makeStyles({
  teamInfoDropdown: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  teamInfo: {
    marginTop: "5vh",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      margin: "0px 20px 0px 20px",
    },
  },
});

export const TeamInfo: React.FC<TeamInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.teamInfo}>
      <div className={styles.teamInfoDropdown}>
        <TeamSelect />
      </div>
      <TeamTable
        userPhoto={props.userPhoto}
        userName={props.userName}
        teamData={props.teamData}
      />
    </div>
  );
};
