import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { store } from "../../../store/store";
import theme from "../../../Theme";
import { InfoModal } from "../molecules/InfoModal";
import { LoginPrompt } from "../molecules/LoginPrompt";

const useStyles = makeStyles({
  loginContent: {
    backgroundColor: theme.palette.primary.main,
  },
  infoButton: {
    bottom: "16px",
    color: "white",
    position: "absolute",
    right: "16px",
  },
});

export const Login: React.FC = () => {
  const styles = useStyles();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  store.dispatch({ type: "USER_LOGOUT" });

  return (
    <>
      <div className={styles.loginContent}>
        <LoginPrompt />
      </div>
      <IconButton
        className={styles.infoButton}
        onClick={() => setInfoModalOpen(true)}
      >
        <InfoIcon />
      </IconButton>
      <InfoModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
    </>
  );
};
