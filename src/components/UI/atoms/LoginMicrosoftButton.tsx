import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  loginMicrosoftButton: {
    borderColor: "white",
    color: "white",
    marginTop: "24px",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },

  loginMicrosoftButtonIcon: {
    margin: "12px 16px 12px 0px",
  },
});

export const LoginMicrosoftButton: React.FC = () => {
  const styles = useStyles();

  return (
    <Button
      className={styles.loginMicrosoftButton}
      component={Link}
      to="/home"
      variant="outlined"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`bi bi-microsoft ${styles.loginMicrosoftButtonIcon}`}
        viewBox="0 0 16 16"
      >
        <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z" />
      </svg>
      Log In with Microsoft
    </Button>
  );
};
