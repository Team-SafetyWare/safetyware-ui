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

    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        margin: "0px",
      },
  },

  content: {
    padding: "24px",

    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        padding: "16px",
      },
  },

  text: {
    margin: 0,
  },
});

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Paper elevation={2} style={{ borderRadius: "0" }}>
        <div className={styles.content}>
          <h1 className={styles.text}>{props.pageTitle}</h1>
          <p className={styles.text}>{props.pageDescription}</p>
        </div>
      </Paper>
    </div>
  );
};
