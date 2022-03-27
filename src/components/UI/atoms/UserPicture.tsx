import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface UserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  userImage: {
    width: "256px",
    "border-radius": "50%;",

    [theme.breakpoints.down("sm")]: {
      width: "160px",
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
