import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface ProfilePhotoProps {
  photo?: string;
  name?: string;
}

const useStyles = makeStyles({
  profilePhotoContent: {
    width: "300px",
    "border-radius": "50%",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
  },
});

export const ProfilePhoto: React.FC<ProfilePhotoProps> = (props) => {
  const styles = useStyles();

  return (
    <img
      className={styles.profilePhotoContent}
      src={props.photo}
      alt={props.name}
    />
  );
};
