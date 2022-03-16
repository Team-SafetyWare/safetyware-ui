import { makeStyles } from "@mui/styles";
import React from "react";
import Paper from "@mui/material/Paper";

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const useStyles = makeStyles({
  container: {
    margin: "-16px -24px 16px",
  },
  content: {
    padding: "24px",
  },
  pageTitle: {
    fontSize: "32px",
    margin: 0,
  },
  pageDescription: {
    fontSize: "16px",
    fontWeight: "normal",
    margin: 0,
  },
});

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Paper elevation={2} style={{ borderRadius: "0" }}>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>{props.pageTitle}</h1>
          <h2 className={styles.pageDescription}>{props.pageDescription}</h2>
        </div>
      </Paper>
    </div>
  );
};
