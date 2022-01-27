import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

interface PageSectionHeaderProps {
  sectionTitle?: string;
  sectionDescription?: string;
  download?: boolean;
}

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  padding: "6px 12px",
  border: ".5px solid",
  borderColor: "black",
  color: "black",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

const useStyles = makeStyles({
  pageGreeting: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  },
  greetingDetails: {},
  greeting: {
    fontSize: "24px",
    margin: 0,
  },
  date: {
    fontSize: "16px",
    margin: 0,
  },
  buttons: {},
});

export const PageSectionHeader: React.FC<PageSectionHeaderProps> = (props) => {
  const styles = useStyles();
  let downloadButton;

  if (props.download) {
    downloadButton = (
      <BootstrapButton variant="outlined" endIcon={<AddOutlinedIcon />}>
        Download Raw Data
      </BootstrapButton>
    );
  }

  return (
    <div className={styles.pageGreeting}>
      <div className={styles.greetingDetails}>
        <p className={styles.greeting}>{props.sectionTitle}</p>
        <p className={styles.date}>{props.sectionDescription}</p>
      </div>
      <div className={styles.buttons}>{downloadButton}</div>
    </div>
  );
};
