import { makeStyles } from "@mui/styles";
import React from "react";
import useDocumentTitle from "../../../util/useDocumentTitle";

const useStyles = makeStyles({
  placeholderDiv: {
    textAlign: "center",
  },
});

export const Gases: React.FC = () => {
  useDocumentTitle("Blackline Safety | Gases");
  const styles = useStyles();

  return (
    <div className={styles.placeholderDiv}>
      <h1>Gases</h1>
    </div>
  );
};
