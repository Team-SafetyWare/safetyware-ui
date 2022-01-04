import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Sidebar } from './components/Sidebar'
import { NavBar } from './components/NavBar'
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
        <NavBar />
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
