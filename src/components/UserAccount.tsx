import { makeStyles } from "@mui/styles";
import React from "react";
import { UserInfo } from "./UI/atoms/UserInfo";

const useStyles = makeStyles({
  tempBody: { marginLeft: "240px" },
  userInfo: {},
});

export const UserAccount: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.tempBody}>
      <UserInfo
        userName={"Jane Doe"}
        userTitle={"Senior Manager at Blackline Safety"}
        userPhone={"123-456-7890"}
        userEmail={"jane.doe@blackline.ca"}
        userTeam={"Team 123-ABC-456"}
      ></UserInfo>
    </div>
  );
};
