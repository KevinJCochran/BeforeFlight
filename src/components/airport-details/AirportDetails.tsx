import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../page-container/PageContainer';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAirport, Status } from '../../redux/airportSlice';

import './AirportDetails.css';
import RunwayCard from '../runway-card/RunwayCard';
import { cloudLayers } from '../../util/airportUtils';
import { fetchWeather } from '../../redux/weatherSlice';
import { HumidityCard, TemperatureCard, VisibilityCard, WindCard } from '../weather-cards/WeatherCards';
import CloudLayerCard from '../cloud-layer-card/CloudLayerCard';
import AirportInfoHeader from '../../airport-info-header/AirportInfoHeader';

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

  const getGreatestCloudLayer = () => {
    if (weather.conditions === undefined)
      return 'Weather conditions unavailable';
    const { layer } = weather.conditions.cloudLayers
      .map(layer => ({ layer: layer.coverage, size: cloudLayers[layer.coverage] }))
      .reduce((prevGreatest, currentLayer) => currentLayer.size > prevGreatest.size ? currentLayer : prevGreatest);
    return layer === 'clr' ? 'Sky clear' : layer;
  };

  let content;

  if (airportStatus === Status.failed) {
    content = (
      <Typography variant='h4' align='center'>
        No data available for this airport
      </Typography>
    );
  } else if (dataLoading() || weather.conditions === undefined) {
    content = (
      <Typography variant='h2'>
        Loading...
      </Typography>
    );
  } else {
    content = (
      <>
        {/* Header */}
        <AirportInfoHeader airport={airport} />
        <Divider className={classes.dividerRoot}/>

        {/* Runways */}
        <Typography variant='h6'>Available runways</Typography>
        <div className='airport-details-cards'>
          {airport.runways.map(rwy => <RunwayCard key={rwy.ident} {...rwy} />)}
        </div>
        <Divider className={classes.dividerRoot}/>

        {/* Weather conditions */}
        <Typography variant='h6'>Current conditions</Typography>
        <div className='airport-details-cards'>
          <WindCard {...weather.conditions.wind} />
          <VisibilityCard {...weather.conditions.visibility} />
          <TemperatureCard tempC={weather.conditions.tempC} dewpointC={weather.conditions.dewpointC}/>
          <HumidityCard relativeHumidity={weather.conditions.relativeHumidity}/>
        </div>
        <Divider className={classes.dividerRoot}/>

        {/* Cloud coverage */}
        <Typography variant='h6'>Cloud coverage</Typography>
        <Typography variant='body1'>Greatest coverage: {getGreatestCloudLayer()}</Typography>
        <div className='airport-details-cards'>
          {weather.conditions.cloudLayers.map(c => <CloudLayerCard key={c.altitudeFt} {...c}/>)}
        </div>
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
