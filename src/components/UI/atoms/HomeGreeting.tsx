import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../../Theme";

interface HomeGreetingProps {
  userName?: string;
  time?: string;
  date?: string;
  day?: string;
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
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
  buttons: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      width: "100%",
    },
    "& .MuiStack-root": {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    "& .MuiButton-root": {
      [theme.breakpoints.down("sm")]: {
        flexGrow: "1",
      },
    },
  },
});

export const HomeGreeting: React.FC<HomeGreetingProps> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.pageGreeting}>
      <div className={styles.greetingDetails}>
        <p className={styles.greeting}>
          Good {props.time}, {props.userName}
        </p>
        <p className={styles.date}>
          Here is your update for {props.day}, {props.date}:
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
  );
};
