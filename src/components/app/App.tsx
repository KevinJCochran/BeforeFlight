import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Home from '../home/Home';
import TopBar from '../top-bar/TopBar';

import store from '../../redux/store';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline/>
      <Router>
        <TopBar/>
        <Switch>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
