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
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        flexDirection: "column",
        paddingBottom: "48px",
      },
  },
  userPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    marginRight: "24px",
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        marginRight: "0",
      },
  },
  userDetails: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        textAlign: "center",
      },
  },
});

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <>
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
    </>
  );
};
