import { makeStyles } from "@mui/styles";
import React from "react";

interface UserInfoProps {
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
  userTeam?: string;
}

const useStyles = makeStyles({
  userInfo: {},
  userName: {},
  userTitle: {},
  userPhone: {},
  userEmail: {},
  userTeam: {},
});

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.userInfo}>
      <h1 className={styles.userName}>{props.userName}</h1>
      <p className={styles.userTitle}>{props.userTitle}</p>
      <p className={styles.userPhone}>{props.userPhone}</p>
      <p className={styles.userEmail}>{props.userEmail}</p>
      <p className={styles.userTeam}>{props.userTeam}</p>
    </div>
  );
};
