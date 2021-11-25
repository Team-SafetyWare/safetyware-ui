import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";

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
        <Switch>
          {/* no component for login yet*/}
          <Route exact path="/login" />
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
