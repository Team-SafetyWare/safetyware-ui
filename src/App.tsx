import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Pages } from "./components/Pages";
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Pages />
      </Router>
    </ThemeProvider>
  );
}

export default App;
