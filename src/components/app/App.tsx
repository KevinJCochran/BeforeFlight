import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from '../home/Home';
import TopBar from '../top-bar/TopBar';

function App() {
  return <div>
    <CssBaseline/>
    <Router>
      <TopBar/>
      <Switch>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  </div>;
}

export default App;
