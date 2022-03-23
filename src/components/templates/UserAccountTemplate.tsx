import { makeStyles } from "@mui/styles";
import React from "react";
import { UserInfo } from "../UI/molecules/UserInfo";

interface UserAccountTemplateProps {
  userPhoto?: string;
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
}

const useStyles = makeStyles({
  userAccountTemplateBody: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5vw",
    width: "65vw",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        marginLeft: "0",
        marginBottom: "24px",
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
      />
    </div>
  );
};
