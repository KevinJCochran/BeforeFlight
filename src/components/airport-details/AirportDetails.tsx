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

const AirportDetails = (): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const urlParams = useParams<{ icao: string }>();
  const icao = urlParams.icao.toUpperCase();

  const airport = useAppSelector(state => state.airports.map[icao]);
  const airportStatus = useAppSelector(state => state.airports.status);

  const weather = useAppSelector(state => state.weather.map[icao]);
  const weatherStatus = useAppSelector(state => state.weather.status);

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
        <Divider className={classes.dividerRoot}/>

        <Typography variant='h6'>Available Runways</Typography>
        <div className='available-runways-cards'>
          {airport.runways.map(rwy => <RunwayCard key={rwy.ident} {...rwy} />)}
        </div>
        <Divider className={classes.dividerRoot}/>

        <Typography variant='h6'>Current Conditions</Typography>
        <WeatherConditions conditions={weather.conditions} />
        <Divider className={classes.dividerRoot}/>

        <Typography variant='h6'>Cloud Layers</Typography>
        <CloudCoverage cloudLayers={weather.conditions?.cloudLayers} />
      </>
    );
  }

  return (
    <PageContainer>
      {content}
    </PageContainer>
  )
};

export default AirportDetails;
