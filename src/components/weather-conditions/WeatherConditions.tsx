import React from 'react';
import { Conditions } from '../../types/weatherTypes';
import { Typography } from '@material-ui/core';
import { HumidityCard, TemperatureCard, VisibilityCard, WindCard } from '../weather-cards/WeatherCards';

import './WeatherConditions.css';

interface Props {
  conditions?: Conditions,
}

/*
* WeatherConditions renders weather cards or a message if conditions are
* unavailable. Broken out into it's own component to keep clutter down
*/
const WeatherConditions = (props: Props): React.ReactElement => {
  if (props.conditions === undefined)
    return (
      <Typography variant='h6' color='error'>
        Current conditions unavailable for this aiport
      </Typography>
    );

  return (
    <div className='weather-conditions-cards'>
      <WindCard {...props.conditions.wind} />
      <VisibilityCard {...props.conditions.visibility} />
      <TemperatureCard tempC={props.conditions.tempC} dewpointC={props.conditions.dewpointC}/>
      <HumidityCard relativeHumidity={props.conditions.relativeHumidity}/>
    </div>
  );
};

export default WeatherConditions;
