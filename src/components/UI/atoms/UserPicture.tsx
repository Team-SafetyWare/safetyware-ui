import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface UserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  userImage: {
    width: "270px",

    [theme.breakpoints.down("sm")]: {
      width: "calc(0.4 * 100vw)",
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
