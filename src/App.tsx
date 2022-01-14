import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Gases } from "./components/Gases";
import { Home } from "./components/Home";
import { Incidents } from "./components/Incidents";
import { Locations } from "./components/Locations";
import { Sidebar } from "./components/UI/atoms/Sidebar";
import { UserAccount } from "./components/UserAccount";

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
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <Switch>
              {/* no component for login yet*/}
              <Route exact path="/login" />
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/locations" component={Locations}></Route>
              <Route exact path="/incidents" component={Incidents}></Route>
              <Route exact path="/gases" component={Gases}></Route>
              <Route exact path="/user-account" component={UserAccount}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
