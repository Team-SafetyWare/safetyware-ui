import { makeStyles } from "@mui/styles";
import React from "react";
import { TeamSelect } from "../atoms/TeamSelect";
import { TeamTable } from "../atoms/TeamTable";

interface TeamInfoProps {
  userPhoto?: string;
  userName?: string;
  teamData?: string[][][];
}

const useStyles = makeStyles({
  teamInfoDropdown: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        display: "flex",
        justifyContent: "center",
      },
  },
  teamInfo: {
    marginTop: "5vh",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
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
