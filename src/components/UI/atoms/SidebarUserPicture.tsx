import { makeStyles } from "@mui/styles";
import React from "react";

interface SidebarUserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles(() => ({
  sidebarUserPicture: {
    height: "64px",
    margin: "8px 34px 8px 0px",
  },
}));

export const SidebarUserPicture: React.FC<SidebarUserPictureProps> = (
  props
) => {
  const styles = useStyles();

  return (
    <img
      className={styles.sidebarUserPicture}
      src={props.userPhoto}
      alt={props.userName}
    />
  );
};
