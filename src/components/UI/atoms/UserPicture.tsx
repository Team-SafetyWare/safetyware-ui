import { makeStyles } from "@mui/styles";
import React from "react";

interface UserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  userPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
});

export const UserPicture: React.FC<UserPictureProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <img src={props.userPhoto} alt={props.userName} />
      <p>Edit</p>
    </>
  );
};
