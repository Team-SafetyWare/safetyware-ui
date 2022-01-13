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
  teamInfo: {
    width: "100%",
    marginTop: "5vh",
  },
});

export const TeamInfo: React.FC<TeamInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.teamInfo}>
      <TeamSelect />
      <TeamTable
        userPhoto={props.userPhoto}
        userName={props.userName}
        teamData={props.teamData}
      />
    </div>
  );
};
