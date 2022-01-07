import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
});

export const Locations: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.placeholderDiv}>
      <h1>Locations</h1>
    </div>
  );
};
