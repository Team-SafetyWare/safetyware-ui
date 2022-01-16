import { ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

interface SidebarTemplateProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles(() => ({
  sidebarAccountItem: {
    display: "flex",
    alignItems: "center",
  },

  sidebarProfilePicture: {
    height: "64px",
    marginRight: "34px",
    marginTop: "8px",
    margin: "8px 34px 8px 0px",
  },
}));

export const SidebarTemplate: React.FC<SidebarTemplateProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.sidebarAccountItem}>
      <img
        className={styles.sidebarProfilePicture}
        src={props.userPhoto}
        alt={props.userName}
      />
      <ListItemText primary={props.userName} />
    </div>
  );
};
