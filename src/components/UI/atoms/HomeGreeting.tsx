import AddIcon from "@mui/icons-material/Add";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import theme from "../../../Theme";

interface HomeGreetingProps {
  activeWidgetState?: any;
  inactiveWidgetState?: any;
  addWidget?: any;
  userName?: string;
  editDashboardMode?: any;
  setEditDashboardMode?: any;
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
    margin: "16px 0",
    [theme.breakpoints.down("sm")]: {
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
  editDashboard: {},
  saveDashboard: {
    animation: "$wiggle 2s linear infinite",
  },
  buttons: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "12px",
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
  "@keyframes wiggle": {
    "0%, 7%": {
      transform: "rotateZ(0)",
    },
    "15%": {
      transform: "rotateZ(-5deg)",
    },
    "20%": {
      transform: "rotateZ(3deg)",
    },
    "25%": {
      transform: "rotateZ(-3deg)",
    },
    "30%": {
      transform: "rotateZ(1deg)",
    },
    "35%": {
      transform: "rotateZ(-0.5deg)",
    },
    "40%, 100%": {
      transform: "rotateZ(0)",
    },
  },
});

export const HomeGreeting: React.FC<HomeGreetingProps> = (props) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);

  const date = new Date();
  const hours = date.getHours();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSelected = (value: any) => {
    setOpen(false);
    props.addWidget(value);
  };

  const handleCloseNoneSelected = () => {
    setOpen(false);
  };

  return (
    <div className={styles.pageGreeting}>
      <div className={styles.greetingDetails}>
        {hours >= 17 ? (
          <p className={styles.greeting}>Good Evening, {props.userName}</p>
        ) : hours >= 12 ? (
          <p className={styles.greeting}>Good Afternoon, {props.userName}</p>
        ) : (
          <p className={styles.greeting}>Good Morning, {props.userName}</p>
        )}
        <p className={styles.date}>
          Here is your update for{" "}
          {date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          :
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
          {props.editDashboardMode ? (
            <BootstrapButton
              className={styles.saveDashboard}
              variant="outlined"
              onClick={props.setEditDashboardMode}
              endIcon={<SaveOutlinedIcon />}
            >
              Save Dashboard
            </BootstrapButton>
          ) : (
            <BootstrapButton
              className={styles.editDashboard}
              variant="outlined"
              onClick={props.setEditDashboardMode}
              endIcon={<EditOutlinedIcon />}
            >
              Edit Dashboard
            </BootstrapButton>
          )}
          <SimpleDialog
            activeWidgetState={props.activeWidgetState}
            inactiveWidgetState={props.inactiveWidgetState}
            open={open}
            onCloseSelected={handleCloseSelected}
            onCloseNoneSelected={handleCloseNoneSelected}
          />
        </Stack>
      </div>
    </div>
  );
};

export interface SimpleDialogProps {
  activeWidgetState?: any;
  inactiveWidgetState?: any;
  open: boolean;
  onCloseSelected: (value: any) => void;
  onCloseNoneSelected: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const {
    onCloseSelected,
    onCloseNoneSelected,
    open,
    inactiveWidgetState,
    activeWidgetState,
  } = props;

  const handleClose = () => {
    onCloseNoneSelected();
  };

  const handleListItemClick = (value: any) => {
    onCloseSelected(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select a Widget to Add to the Dashboard</DialogTitle>
      <List sx={{ pt: 0 }}>
        {inactiveWidgetState.map((widget: any) => (
          <ListItem
            button
            onClick={() => handleListItemClick(widget)}
            key={widget.widgetName}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "white", color: "black" }}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={widget.widgetName} />
          </ListItem>
        ))}
        {activeWidgetState.map((widget: any) => (
          <ListItem disabled={true} key={widget.widgetName}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "white", color: "black" }}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={widget.widgetName} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
