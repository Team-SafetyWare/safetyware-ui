import { Button, TextField, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Access, setCurrentUser } from "../../..";
import theme from "../../../Theme";
import { useReplaceUserAccount } from "../../../util/queryService";

interface ProfileDetailsProps {
  id: string;
  name: string;
  title: string;
  companyId: string;
  companyName: string;
  email: string;
  phone: string;
  access: Access;
}

const useStyles = makeStyles({
  profileDetailsForm: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
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
  profileDetailsUpdateButton: {
    height: "56px",
    marginTop: "24px",
    textTransform: "none",
    width: "300px",
  },
});

export const ProfileDetails: React.FC<ProfileDetailsProps> = (props) => {
  const styles = useStyles();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [updatedName, setUpdatedName] = useState(props.name);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedEmail, setUpdatedEmail] = useState(props.email);
  const [updatedPhone, setUpdatedPhone] = useState(props.phone);

  const [updateProfile] = useReplaceUserAccount();

  const handleUpdateProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      id: props.id,
      name: updatedName,
      access: props.access,
      title: updatedTitle,
      email: updatedEmail,
      phone: updatedPhone,
      company: {
        id: props.companyId,
        name: props.companyName,
      },
    };

    updateProfile({
      variables: {
        id: updatedUser.id,
        input: {
          name: updatedUser.name,
          title: updatedUser.title,
          email: updatedUser.email,
          phone: updatedUser.phone,
          companyId: updatedUser.company.id,
          access: updatedUser.access,
        },
      },
    });

    setCurrentUser(updatedUser);
  };

  return (
    <form
      className={styles.profileDetailsForm}
      onSubmit={handleUpdateProfileSubmit}
    >
      <div className={styles.profileDetailsContent}>
        <div className={styles.profileDetailsContentColumn}>
          {!mediumScreen && (
            <h2 className={styles.profileDetailsHeader}>About</h2>
          )}
          <TextField
            className={styles.profileDetailsTextField}
            defaultValue={props.name}
            disabled={props.access == Access.View ? true : false}
            id="name"
            label="Name"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedName(e.target.value)
            }
            variant="filled"
          />
          <TextField
            className={styles.profileDetailsTextField}
            defaultValue={props.title}
            disabled={props.access == Access.View ? true : false}
            label="Title"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedTitle(e.target.value)
            }
            variant="filled"
          />
          <TextField
            className={styles.profileDetailsTextField}
            defaultValue={props.companyName}
            disabled={true}
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
            label="Email"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedEmail(e.target.value)
            }
            variant="filled"
          />
          <TextField
            className={styles.profileDetailsTextField}
            defaultValue={props.phone}
            disabled={props.access == Access.View ? true : false}
            label="Phone"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdatedPhone(e.target.value)
            }
            variant="filled"
          />
        </div>
      </div>
      <Button
        className={styles.profileDetailsUpdateButton}
        disabled={props.access == Access.View ? true : false}
        type="submit"
        variant="contained"
      >
        Update Profile
      </Button>
    </form>
  );
};
