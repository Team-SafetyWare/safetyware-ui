import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

const useStyles = makeStyles({
  content: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    textAlign: "center",
    width: "100vw",
  },
  message: {
    color: "white",
    padding: "64px",
  },
});

export const LandscapeMobileView: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.content}>
      <h1 className={styles.message}>
        SafteyWare is intended to be used in portrait mode on mobile devices.
        Please rotate your device.
      </h1>
    </div>
  );
};
