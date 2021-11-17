import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          {/* no component for login yet*/}
          <Route exact path="/login"/>
          <Route exact path="/" component={Home}>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
