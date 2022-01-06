import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
});

export const Incidents: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.placeholderDiv}>
      <h1>Incidents</h1>
    </div>
  );
};
