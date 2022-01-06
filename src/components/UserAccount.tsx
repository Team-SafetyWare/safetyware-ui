import { makeStyles } from "@mui/styles";
import React from "react";
import ProfilePicture from "../assets/183.png";
import { TeamInfo } from "./UI/molecules/TeamInfo";
import { UserInfo } from "./UI/molecules/UserInfo";

const useStyles = makeStyles({
  tempBody: {
    display: "flex",
    flexDirection: "column",
    width: "65vw",
    marginLeft: "5vw",
    marginTop: "5vh",
  },
  temp: {
    marginLeft: "240px",
    backgroundColor: "#F8F8F8",
  },
});

export const UserAccount: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.temp}>
      <div className={styles.tempBody}>
        <UserInfo
          userPhoto={ProfilePicture}
          userName={"Jane Doe"}
          userTitle={"Senior Manager at Blackline Safety"}
          userPhone={"123-456-7890"}
          userEmail={"jane.doe@blackline.ca"}
          userTeam={"Team 123-ABC-456"}
        />
        <TeamInfo userPhoto={ProfilePicture} userName={"Jane Doe"} />
      </div>
    </div>
  );
};
