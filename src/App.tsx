import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Pages } from "./components/Pages";
import theme from "./Theme";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { StyledEngineProvider } from "@mui/material/styles";

function App(): any {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Pages />
          </Router>
        </LocalizationProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
