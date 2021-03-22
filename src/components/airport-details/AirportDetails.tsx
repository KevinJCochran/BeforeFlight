import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAirport, Status } from '../../redux/airportSlice';
import { fetchWeather } from '../../redux/weatherSlice';

import PageContainer from '../page-container/PageContainer';
import RunwayCard from '../runway-card/RunwayCard';
import AirportInfoHeader from '../airport-info-header/AirportInfoHeader';
import WeatherConditions from '../weather-conditions/WeatherConditions';
import CloudCoverage from '../cloud-coverage/CloudCoverage';

import './AirportDetails.css';

const useStyles = makeStyles(() => createStyles({
  dividerRoot: {
    marginBottom: '1rem',
  }
}));

/*
* AirportDetails is responsible for rendering details about an
* airport. On mount, it will look up the specified airport in Redux.
* If the airport is not loaded yet, it will dispatch an action that
* will load it. The specifics of rendering all details is delegated
* to sub components to keep this component less cluttered and
* focused on getting the requested airport. If the requested airport
* cannot be loaded, it will render a message saying the airport
* is unavailable.
*/
const AirportDetails = (): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  // Get URL param
  const urlParams = useParams<{ icao: string }>();
  const icao = urlParams.icao.toUpperCase();

  const airport = useAppSelector(state => state.airports.map[icao]);
  const airportStatus = useAppSelector(state => state.airports.status);

  const weather = useAppSelector(state => state.weather.map[icao]);
  const weatherStatus = useAppSelector(state => state.weather.status);

  // The following hooks are separate because they
  // to prevent loading of weather twice
  useEffect(() => {
    if (airport === undefined)
      dispatch(fetchAirport(icao));
  }, [airport, icao, dispatch]);

  useEffect(() => {
    if (weather === undefined)
      dispatch(fetchWeather(icao));
  }, [weather, icao, dispatch]);

  const dataLoading = () =>
    airportStatus === Status.loading ||
    airport === undefined ||
    weatherStatus === Status.loading ||
    weather === undefined;

  let content;

  // Render based on redux state
  if (airportStatus === Status.failed) {
    content = (
      <Typography variant='h4' align='center'>
        No data available for this airport
      </Typography>
    );
  } else if (dataLoading()) {
    content = (
      <Typography variant='h2'>
        Loading...
      </Typography>
    );
  } else {
    content = (
      <>
        <AirportInfoHeader airport={airport} />
        <Divider className={classes.dividerRoot} />

        <Typography variant='h6'>Available Runways</Typography>
        <div className='available-runways-cards'>
          {airport.runways.map(rwy => <RunwayCard key={rwy.ident} {...rwy} />)}
        </div>
        <Divider className={classes.dividerRoot} />

        <Typography variant='h6'>Current Conditions</Typography>
        <WeatherConditions conditions={weather.conditions} />
        <Divider className={classes.dividerRoot} />

        <Typography variant='h6'>Cloud Layers</Typography>
        <CloudCoverage cloudLayers={weather.conditions?.cloudLayers} />
      </>
    );
  }

  // PageContainer should remain mounted during all phases of loading
  return (
    <PageContainer>
      {content}
    </PageContainer>
  )
};

export default AirportDetails;
