import { makeStyles } from "@mui/styles";
import React from "react";
import ProfilePicture from "../assets/183.png";
import { UserAccountTemplate } from "./templates/UserAccountTemplate";

const useStyles = makeStyles({
  UserAccountBody: {
    marginLeft: "240px",
  },
});

export const UserAccount: React.FC = () => {
  const styles = useStyles();

  //TO-DO: Add mock-data for different teams so implementing dynamic site features will
  //       be easier

  return (
    <div className={styles.UserAccountBody}>
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
