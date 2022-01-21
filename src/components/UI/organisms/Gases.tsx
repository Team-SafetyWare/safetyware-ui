import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
});

export const Gases: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.placeholderDiv}>
      <h1>Gases</h1>
    </div>
  );
};
