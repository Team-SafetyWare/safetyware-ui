import { makeStyles } from "@mui/styles";
import React from "react";
import { store } from "../../../store/store";
import { LoginPrompt } from "../molecules/LoginPrompt";

const useStyles = makeStyles({
  loginContent: {
    backgroundColor: "#ad172b",
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
