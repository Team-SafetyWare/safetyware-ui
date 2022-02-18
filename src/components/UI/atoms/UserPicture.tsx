import { makeStyles } from "@mui/styles";
import React from "react";

interface UserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  userImage: {
    width: "270px",

    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        width: "150px",
      },
  },
});

export const UserPicture: React.FC<UserPictureProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <img
        className={styles.userImage}
        src={props.userPhoto}
        alt={props.userName}
      />
    </>
  );
};
