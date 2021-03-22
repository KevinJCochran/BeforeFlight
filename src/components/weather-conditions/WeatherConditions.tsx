import React from 'react';
import { Conditions } from '../../types/weatherTypes';
import { Typography } from '@material-ui/core';
import { HumidityCard, TemperatureCard, VisibilityCard, WindCard } from '../weather-cards/WeatherCards';

import './WeatherConditions.css';

interface Props {
  conditions?: Conditions,
}

const WeatherConditions = (props: Props): React.ReactElement => {
  if (props.conditions === undefined)
    return (
      <Typography variant='h6'>
        Current conditions unavailable for this location
      </Typography>
    )

  return (
    <div className='weather-conditions-cards'>
      <WindCard {...props.conditions.wind} />
      <VisibilityCard {...props.conditions.visibility} />
      <TemperatureCard tempC={props.conditions.tempC} dewpointC={props.conditions.dewpointC}/>
      <HumidityCard relativeHumidity={props.conditions.relativeHumidity}/>
    </div>
  )
}

export default WeatherConditions;
