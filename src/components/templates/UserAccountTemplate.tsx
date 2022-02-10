import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../Theme";
import { TeamInfo } from "../UI/molecules/TeamInfo";
import { UserInfo } from "../UI/molecules/UserInfo";

interface UserAccountTemplateProps {
  userPhoto?: string;
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
  userTeam?: string;
  teamData?: string[][][];
}

const useStyles = makeStyles({
  userAccountTemplateBody: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5vw",
    width: "65vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      width: "auto",
    },
  },
});

export const UserAccountTemplate: React.FC<UserAccountTemplateProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <div className={styles.userAccountTemplateBody}>
      <UserInfo
        userPhoto={props.userPhoto}
        userName={props.userName}
        userTitle={props.userTitle}
        userPhone={props.userPhone}
        userEmail={props.userEmail}
        userTeam={props.userTeam}
      />
      <TeamInfo
        userPhoto={props.userPhoto}
        userName={props.userName}
        teamData={props.teamData}
      />
    </div>
  );
};
