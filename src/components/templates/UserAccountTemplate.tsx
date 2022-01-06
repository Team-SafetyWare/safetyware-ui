import { makeStyles } from "@mui/styles";
import React from "react";
import { TeamInfo } from "../UI/molecules/TeamInfo";
import { UserInfo } from "../UI/molecules/UserInfo";

interface UserAccountTemplateProps {
  userPhoto?: string;
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
  userTeam?: string;
}

const useStyles = makeStyles({
  userAccountTemplateBody: {
    display: "flex",
    flexDirection: "column",
    width: "65vw",
    marginLeft: "5vw",
    marginTop: "5vh",
  },
  temp: {
    marginLeft: "240px",
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
      <TeamInfo userPhoto={props.userPhoto} userName={props.userName} />
    </div>
  );
};
