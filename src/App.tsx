import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Sidebar } from './components/Sidebar'
import './App.css';

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
