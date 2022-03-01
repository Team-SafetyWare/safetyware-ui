import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

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
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        alignItems: "normal",
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
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        marginTop: "10px",
        width: "100%",
      },
    "& .MuiStack-root": {
      "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
        {
          display: "flex",
        },
    },
    "& .MuiButton-root": {
      "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
        {
          flexGrow: "1",
        },
    },
  },
});

export const HomeGreeting: React.FC<HomeGreetingProps> = (props) => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
          <BootstrapButton
            variant="outlined"
            endIcon={<AddOutlinedIcon />}
            onClick={handleClickOpen}
          >
            Add Widget
          </BootstrapButton>
          <BootstrapButton
            variant="outlined"
            endIcon={<FilterAltOutlinedIcon />}
          >
            Filter
          </BootstrapButton>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Stack>
      </div>
    </div>
  );
};

const emails = ["Travel History Trail Map", "Hazardous Area Heat Map"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select a new Widget</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
