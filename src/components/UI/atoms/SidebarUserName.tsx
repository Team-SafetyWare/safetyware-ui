import { ListItemText } from "@mui/material";
import React from "react";

interface SidebarUserNameProps {
  userName?: string;
}

export const SidebarUserName: React.FC<SidebarUserNameProps> = (props) => {
  return <ListItemText primary={props.userName} />;
};
