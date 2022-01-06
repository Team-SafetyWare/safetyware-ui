import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Gases } from "./components/Gases";
import { Home } from "./components/Home";
import { Incidents } from "./components/Incidents";
import { Locations } from "./components/Locations";
import { Sidebar } from "./components/Sidebar";
import { UserAccount } from "./components/UserAccount";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Sidebar />
        {/*<NavBar />*/}
        <Switch>
          {/* no component for login yet*/}
          <Route exact path="/login" />
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/locations" component={Locations}></Route>
          <Route exact path="/incidents" component={Incidents}></Route>
          <Route exact path="/gases" component={Gases}></Route>
          <Route exact path="/user-account" component={UserAccount}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
