import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Pages } from "./components/Pages";
import { LandscapeMobileView } from "./components/UI/atoms/LandscapeMobileView";
import theme from "./Theme";

function App(): any {
  const [visible, setVisible] = useState(true);

  if (isMobile && screen.orientation.type == "landscape-primary") {
    return <LandscapeMobileView />;
  }

  screen.orientation.onchange = function () {
    if (isMobile) {
      if (screen.orientation.type == "landscape-primary") {
        setVisible(false);
      } else if (screen.orientation.type == "portrait-primary") {
        setVisible(true);
      }
    }
  };

  if (visible) {
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
  } else {
    return <LandscapeMobileView />;
  }
}

export default App;
