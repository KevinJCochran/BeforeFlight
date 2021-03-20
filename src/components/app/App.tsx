import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';

import TopBar from '../top-bar/TopBar';
import Home from '../home/Home';
import AirportDetails from '../airport-details/AirportDetails';

import store from '../../redux/store';

const App = () => (
  <Provider store={store}>
    <CssBaseline/>
    <Router>
      <TopBar/>
      <Switch>
        <Route path='/airport/:icao'>
          <AirportDetails />
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
