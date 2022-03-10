import { Button, StyledEngineProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import MicrosoftLogo from "../../../assets/microsoft-brands.svg"; // https://fontawesome.com/license

const useStyles = makeStyles({
  loginButton: {
    textTransform: "none",
    marginTop: "24px",
  },

  loginButtonMicrosoftLogo: {
    filter: "invert(100%)",
    height: "24px",
    margin: "10px 16px 10px 0px",
  },
});

export const LoginButton: React.FC = () => {
  const styles = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <Button
        className={styles.loginButton}
        component={Link}
        to="/home"
        variant="contained"
      >
        Log In
      </Button>
    </StyledEngineProvider>
  );
};
