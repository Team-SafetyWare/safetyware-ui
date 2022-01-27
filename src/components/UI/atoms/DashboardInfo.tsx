import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import { PageHeader } from "../atoms/PageHeader";

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
  pageInfo: {
    backgroundColor: "white",
    padding: "24px 25px",
    margin: "-10px -25px 15px", // This is gross, I know
  },
  pageLabel: {
    fontSize: "32px",
    margin: 0,
  },
  pageDescription: {
    fontSize: "16px",
    fontWeight: "normal",
    margin: 0,
  },
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

export const DashboardInfo: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <PageHeader
        pageTitle={"Home"}
        pageDescription={
          "Description of the Home Page (Dashboard) and What it Does"
        }
      />
      <div className={styles.pageGreeting}>
        <div className={styles.greetingDetails}>
          <p className={styles.greeting}>Good Afternoon, Jane</p>
          <p className={styles.date}>
            Here is your update for Thursday, January 20th, 2022:
          </p>
        </div>
        <div className={styles.buttons}>
          <Stack spacing={2} direction="row">
            <BootstrapButton variant="outlined" endIcon={<AddOutlinedIcon />}>
              Add Widget
            </BootstrapButton>
            <BootstrapButton
              variant="outlined"
              endIcon={<FilterAltOutlinedIcon />}
            >
              Filter
            </BootstrapButton>
          </Stack>
        </div>
      </div>
    </>
  );
};
