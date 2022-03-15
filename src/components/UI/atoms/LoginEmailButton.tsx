import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  loginEmailButton: {
    borderColor: "white",
    color: "white",
    height: "46px",
    marginTop: "24px",
    textTransform: "none",

    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
});

export const LoginEmailButton: React.FC = () => {
  const styles = useStyles();

  return (
    <Button
      className={styles.loginEmailButton}
      component={Link}
      to="/home"
      variant="outlined"
    >
      Log In with Email
    </Button>
  );
};
