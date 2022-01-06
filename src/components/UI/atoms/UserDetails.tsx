import { makeStyles } from "@mui/styles";
import React from "react";

interface UserInfoProps {
  userPhoto?: string;
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
  userTeam?: string;
}

const useStyles = makeStyles({
  userName: {
    fontSize: "30px",
    margin: "5px 0",
  },
  userTitle: {
    fontSize: "18px",
    margin: 0,
  },
  userContact: {
    fontSize: "18px",
    margin: 0,
  },
  userTeam: {
    fontSize: "18px",
    margin: 0,
  },
});

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <h1 className={styles.userName}>{props.userName}</h1>
      <p className={styles.userTitle}>{props.userTitle}</p>
      <p className={styles.userContact}>
        {props.userPhone} | {props.userEmail}
      </p>
      <p className={styles.userTeam}>{props.userTeam}</p>
    </>
  );
};
