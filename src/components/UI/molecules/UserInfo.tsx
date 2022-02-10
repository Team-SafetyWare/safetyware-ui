import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";
import { UserDetails } from "../atoms/UserDetails";
import { UserPicture } from "../atoms/UserPicture";

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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  userPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
    },
  },
  userDetails: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
});

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.userInfo}>
      <div className={styles.userPhoto}>
        <UserPicture userPhoto={props.userPhoto}></UserPicture>
      </div>
      <div className={styles.userDetails}>
        <UserDetails
          userName={props.userName}
          userTitle={props.userTitle}
          userPhone={props.userPhone}
          userEmail={props.userEmail}
          userTeam={props.userTeam}
        ></UserDetails>
      </div>
    </div>
  );
};
