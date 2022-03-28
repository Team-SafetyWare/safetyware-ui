import { Button, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Access } from "../../..";
import { ProfileDetails } from "../atoms/ProfileDetails";
import { ProfilePhoto } from "../atoms/ProfilePhoto";

interface ProfileDataProps {
  photo?: string;
  name?: string;
  title?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  access?: Access;
}

const useStyles = makeStyles({
  profileDataContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  profileDataPhoto: {
    marginTop: "8px",
  },
  profileDataUpdateButton: {
    height: "56px",
    marginTop: "24px",
    textTransform: "none",
    width: "300px",
  },
});

export const ProfileData: React.FC<ProfileDataProps> = (props) => {
  const styles = useStyles();

  return (
    <Card elevation={2}>
      <CardContent>
        <div className={styles.profileDataContent}>
          <div className={styles.profileDataPhoto}>
            <ProfilePhoto photo={props.photo} name={props.name} />
          </div>
          <ProfileDetails
            name={props.name}
            title={props.title}
            companyName={props.companyName}
            email={props.email}
            phone={props.phone}
            access={props.access}
          />
          <Button
            className={styles.profileDataUpdateButton}
            disabled={props.access == Access.View ? true : false}
            variant="contained"
          >
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
