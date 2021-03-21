import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../page-container/PageContainer';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAirport, Status } from '../../redux/airportSlice';

import './AirportDetails.css';
import RunwayCard from '../runway-card/RunwayCard';
import { formatLatLong, getFormattedAddress, getFormattedWinds } from '../../util/airportUtils';
import { fetchWeather } from '../../redux/weatherSlice';

const useStyles = makeStyles(() => createStyles({
  dividerRoot: {
    marginBottom: '1rem',
  }
}));

const AirportDetails = (): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { icao } = useParams<{ icao: string }>();

  const airport = useAppSelector(state => state.airports.map[icao]);
  const airportStatus = useAppSelector(state => state.airports.status);

  const weather = useAppSelector(state => state.weather.map[icao]);
  const weatherStatus = useAppSelector(state => state.weather.status);

  useEffect(() => {
    if (airport === undefined)
      dispatch(fetchAirport(icao));
    if (weather === undefined)
      dispatch(fetchWeather(icao));
  }, [airport, weather, icao, dispatch]);

  const dataLoading = () =>
    airportStatus === Status.loading ||
    airport === undefined ||
    weatherStatus === Status.loading ||
    weather === undefined;

  // TODO Failed to load state

  if (dataLoading() || weather.conditions === undefined)
    return <Typography variant='h2'>Loading...</Typography>;

  return (
    <PageContainer>

      {/* Header */}
      <header className='airport-details-header'>
        <div>
          <Typography variant='h3'>
            {airport.code}
          </Typography>
          <Typography variant='subtitle1'>
            {airport.name} Airport
          </Typography>
        </div>
        <div>
          <Typography variant='body1' align='right'>
            {getFormattedAddress(airport)}
          </Typography>
          <Typography variant='body1' align='right'>
            {formatLatLong(airport.latitude, airport.longitude)}
          </Typography>
        </div>
      </header>
      <Divider className={classes.dividerRoot} />

      {/* Runways */}
      <Typography variant='h6'>Available runways</Typography>
      <div className='available-runways-cards'>
        { airport.runways.map(rwy => <RunwayCard key={rwy.ident} {...rwy} />) }
      </div>
      <Divider className={classes.dividerRoot} />

      {/* Weather conditions */}
      <Typography variant='h6'>Current weather conditions</Typography>
      <Typography variant='body1' paragraph>
        Wind: {getFormattedWinds(weather.conditions.wind)}
      </Typography>
      <Typography variant='body1' paragraph>
        Visibility: {weather.conditions.visibility.distanceSm} SM
      </Typography>
      <Typography variant='body1' paragraph>
        Temperature: {weather.conditions.tempC}&#730;C (dewpoint: {weather.conditions.dewpointC}&#730;C)
      </Typography>
      <Typography variant='body1' paragraph>
        Humidity: {weather.conditions.relativeHumidity}%
      </Typography>
    </PageContainer>
  );
};

export default AirportDetails;
