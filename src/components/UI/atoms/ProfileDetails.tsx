import { TextField, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Access } from "../../..";
import theme from "../../../Theme";

interface ProfileDetailsProps {
  name?: string;
  title?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  access?: Access;
}

const useStyles = makeStyles({
  profileDetailsContent: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  profileDetailsContentColumn: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    margin: "0 12px",
    "& > *": {
      marginTop: "24px",
    },
  },
  profileDetailsHeader: {
    margin: "24px 0 0 0",
  },
  profileDetailsTextField: {
    minWidth: "300px",
    "& .MuiFilledInput-root": {
      "&::before": {
        borderStyle: "none",
      },
      "&::after": {
        borderStyle: "none",
      },
      "&:hover": {
        "&::before": {
          borderStyle: "none",
        },
        "&::after": {
          borderStyle: "none",
        },
      },
    },
  },
});

export const ProfileDetails: React.FC<ProfileDetailsProps> = (props) => {
  const styles = useStyles();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={styles.profileDetailsContent}>
      <div className={styles.profileDetailsContentColumn}>
        {!mediumScreen && (
          <h2 className={styles.profileDetailsHeader}>About</h2>
        )}
        <TextField
          className={styles.profileDetailsTextField}
          defaultValue={props.name}
          disabled={props.access == Access.View ? true : false}
          id="user-name"
          label="Name"
          variant="filled"
        />
        <TextField
          className={styles.profileDetailsTextField}
          defaultValue={props.title}
          disabled={props.access == Access.View ? true : false}
          id="user-title"
          label="Title"
          variant="filled"
        />
        <TextField
          className={styles.profileDetailsTextField}
          defaultValue={props.companyName}
          disabled={true}
          id="user-company"
          label="Company"
          variant="filled"
        />
      </div>
      <div className={styles.profileDetailsContentColumn}>
        {!mediumScreen && (
          <h2 className={styles.profileDetailsHeader}>Contact</h2>
        )}
        <TextField
          className={styles.profileDetailsTextField}
          defaultValue={props.email}
          disabled={props.access == Access.View ? true : false}
          id="user-email"
          label="Email"
          variant="filled"
        />
        <TextField
          className={styles.profileDetailsTextField}
          defaultValue={props.phone}
          disabled={props.access == Access.View ? true : false}
          id="user-phone"
          label="Phone"
          variant="filled"
        />
      </div>
    </div>
  );
};
