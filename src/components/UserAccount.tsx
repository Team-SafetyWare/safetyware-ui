import { makeStyles } from "@mui/styles";
import React from "react";
import ProfilePicture from "../assets/183.png";
import { UserAccountTemplate } from "./templates/UserAccountTemplate";

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

  //TO-DO: Add mock-data for different teams so implementing dynamic site features will
  //       be easier

  return (
    <div className={styles.temp}>
      <UserAccountTemplate
        userPhoto={ProfilePicture}
        userName={"Jane Doe"}
        userTitle={"Senior Manager at Blackline Safety"}
        userPhone={"123-456-7890"}
        userEmail={"jane.doe@blackline.ca"}
        userTeam={"Team 123-ABC-456"}
      />
    </div>
  );
};
