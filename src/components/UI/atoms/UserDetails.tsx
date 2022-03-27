import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface UserDetailsProps {
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
}

const useStyles = makeStyles({
  userName: {
    fontSize: "30px",
    margin: "8px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  userTitle: {
    fontSize: "18px",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  userContact: {
    fontSize: "18px",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
});

export const UserDetails: React.FC<UserDetailsProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <h1 className={styles.userName}>{props.userName}</h1>
      <p className={styles.userTitle}>{props.userTitle}</p>
      <p className={styles.userContact}>{props.userPhone}</p>
      <p className={styles.userContact}>{props.userEmail}</p>
    </>
  );
};
