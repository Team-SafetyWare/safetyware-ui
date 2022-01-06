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
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  userDetails: {
    fontSize: "18px",
  },
  userName: {
    fontSize: "30px",
    margin: "5px 0",
  },
  userTitle: {
    margin: 0,
  },
  userContact: {
    margin: 0,
  },
  userTeam: {
    margin: 0,
  },
});

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.userInfo}>
      <div className={styles.userPhoto}>
        <img src={props.userPhoto} alt={props.userName} />
        <p>Edit</p>
      </div>

      <div className={styles.userDetails}>
        <h1 className={styles.userName}>{props.userName}</h1>
        <p className={styles.userTitle}>{props.userTitle}</p>
        <p className={styles.userContact}>
          {props.userPhone} | {props.userEmail}
        </p>
        <p className={styles.userTeam}>{props.userTeam}</p>
      </div>
    </div>
  );
};
