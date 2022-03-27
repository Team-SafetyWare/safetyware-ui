import { makeStyles } from "@mui/styles";
import React from "react";
import { store } from "../../../store/store";
import theme from "../../../Theme";
import { LoginPrompt } from "../molecules/LoginPrompt";

const useStyles = makeStyles({
  loginContent: {
    backgroundColor: theme.palette.primary.main,
  },
});

export const Login: React.FC = () => {
  const styles = useStyles();

  store.dispatch({ type: "USER_LOGOUT" });

  return (
    <div className={styles.loginContent}>
      <LoginPrompt />
    </div>
  );
};
