import { makeStyles } from "@mui/styles";
import React from "react";

interface PageHeaderProps {
  pageTitle?: string;
  pageDescription?: string;
}

const useStyles = makeStyles({
  pageHeader: {
    backgroundColor: "white",
    padding: "24px 25px",
    margin: "-16px -24px 16px",
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
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{props.pageTitle}</h1>
      <h2 className={styles.pageDescription}>{props.pageDescription}</h2>
    </div>
  );
};
