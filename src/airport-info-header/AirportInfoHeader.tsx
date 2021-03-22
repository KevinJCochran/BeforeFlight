import React from 'react';
import { Airport } from '../types/airportTypes';
import { Typography } from '@material-ui/core';
import { formatLatLong, getFormattedAddress } from '../util/airportUtils';

interface Props {
  airport: Airport,
}

const AirportInfoHeader = (props: Props): React.ReactElement => (
  <header className='airport-details-header'>
    <div>
      <Typography variant='h3'>
        {props.airport.code}
      </Typography>
      <Typography variant='subtitle1'>
        {props.airport.name} Airport
      </Typography>
    </div>
    <div>
      <Typography variant='body1' align='right'>
        {getFormattedAddress(props.airport)}
      </Typography>
      <Typography variant='body1' align='right'>
        {formatLatLong(props.airport.latitude, props.airport.longitude)}
      </Typography>
    </div>
  </header>
)

export default AirportInfoHeader;
