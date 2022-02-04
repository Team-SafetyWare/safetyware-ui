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
  teamInfo: {
    width: "100%",
    marginTop: "5vh",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      marginTop: "20px",
    },
  },
  teamInfoDropdown: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
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
