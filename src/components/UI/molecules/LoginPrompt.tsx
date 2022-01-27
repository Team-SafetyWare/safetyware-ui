import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../../../assets/logo.png";
import { LoginButton } from "../atoms/LoginButton";

const useStyles = makeStyles({
  loginBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
  },

  loginDiv: {
    display: "flex",
    flexDirection: "column",
  },
});

export const LoginPrompt: React.FC = () => {
  const styles = useStyles();

  return (
    <Box className={styles.loginBox}>
      <div className={styles.loginDiv}>
        <img src={Logo} alt="Blackline Safety" />
        <LoginButton />
      </div>
    </Box>
  );
};
