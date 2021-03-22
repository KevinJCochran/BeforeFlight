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

/*
* App is the top of the render tree and is responsible for
* providing the Redux store and router to the application.
* The router only has two routes at the moment but having a
* router from the start ensures that more functionality can
* be added later. Additionally it allows each airport to
* have its own URL which enables sharing links.
*/
const App = () => (
  <Provider store={store}>
    {/* Inject basic styles into app */}
    <CssBaseline/>
    <Router>
      {/* Top bar will not unmount on navigation */}
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
