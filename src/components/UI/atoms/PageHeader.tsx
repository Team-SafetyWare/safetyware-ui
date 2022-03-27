import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const useStyles = makeStyles({
  container: {
    margin: "-16px -24px 16px",

    [theme.breakpoints.down("sm")]: {
      margin: "0px",
    },
  },

  content: {
    padding: "24px",

    [theme.breakpoints.down("sm")]: {
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
