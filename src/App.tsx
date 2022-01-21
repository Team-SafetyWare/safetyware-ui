import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import ProfilePicture from "./assets/profilePicture.png";
import { Page } from "./components/UI/atoms/Page";
import { Sidebar } from "./components/UI/molecules/Sidebar";
import { Gases } from "./components/UI/organisms/Gases";
import { Home } from "./components/UI/organisms/Home";
import { Incidents } from "./components/UI/organisms/Incidents";
import { Locations } from "./components/UI/organisms/Locations";
import { UserAccount } from "./components/UI/organisms/UserAccount";

const theme = createTheme({
  // Use the system font instead of the default Roboto font.
  typography: {
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
  },
});

const useStyles = makeStyles({
  content: {
    height: "100vh",
    width: "100vw",
    paddingLeft: "240px",
  },
  innerContent: {
    height: "100%",
    width: "100%",
    padding: "10px 25px",
  },
});

function App() {
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Sidebar userName="Jane Doe" userPhoto={ProfilePicture} />
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <Switch>
              <Page exact path="/login" />
              <Page
                exact
                path="/"
                title="Blackline Safety | Home"
                component={Home}
              />
              <Page
                exact
                path="/locations"
                title="Blackline Safety | Locations"
                component={Locations}
              />
              <Page
                exact
                path="/incidents"
                title="Blackline Safety | Incidents"
                component={Incidents}
              />
              <Page
                exact
                path="/gases"
                title="Blackline Safety | Gases"
                component={Gases}
              />
              <Page
                exact
                path="/user-account"
                title="Blackline Safety | My Account"
                component={UserAccount}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
