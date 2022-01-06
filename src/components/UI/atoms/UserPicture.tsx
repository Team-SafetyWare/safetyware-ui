import { makeStyles } from "@mui/styles";
import React from "react";

interface UserInfoProps {
  userPhoto?: string;
  userName?: string;
  userTitle?: string;
  userPhone?: string;
  userEmail?: string;
  userTeam?: string;
}

const useStyles = makeStyles({
  userPhoto: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
});

export const UserPicture: React.FC<UserInfoProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <img src={props.userPhoto} alt={props.userName} />
      <p>Edit</p>
    </>
  );
};
