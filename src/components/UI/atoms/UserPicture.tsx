import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { makeStyles } from "@mui/styles";
import React from "react";

interface UserPictureProps {
  userPhoto?: string;
  userName?: string;
}

const useStyles = makeStyles({
  editBox: {
    display: "flex",
    alignItems: "center",
    margin: "0",
  },
  editText: {
    height: "100%",
    marginLeft: "5px",
  },
});

export const UserPicture: React.FC<UserPictureProps> = (props) => {
  const styles = useStyles();

  return (
    <>
      <img src={props.userPhoto} alt={props.userName} />
      <div className={styles.editBox}>
        <EditOutlinedIcon />
        <div className={styles.editText}>Edit</div>
      </div>
    </>
  );
};
