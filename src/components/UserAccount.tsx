import { makeStyles } from "@mui/styles";
import React from "react";
import ProfilePicture from "../assets/183.png";
import { TeamInfo } from "./UI/molecules/TeamInfo";
import { UserInfo } from "./UI/molecules/UserInfo";

const useStyles = makeStyles({
  tempBody: { marginLeft: "240px" },
  userInfo: {},
});

export const UserAccount: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.tempBody}>
      <UserInfo
        userPhoto={ProfilePicture}
        userName={"Jane Doe"}
        userTitle={"Senior Manager at Blackline Safety"}
        userPhone={"123-456-7890"}
        userEmail={"jane.doe@blackline.ca"}
        userTeam={"Team 123-ABC-456"}
      />
      <TeamInfo />
    </div>
  );
};
