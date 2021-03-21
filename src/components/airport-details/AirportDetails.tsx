import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../page-container/PageContainer';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAirport, Status } from '../../redux/airportSlice';

import './AirportDetails.css';
import RunwayCard from '../../runway-card/RunwayCard';
import { formatLatLong, getFormattedAddress } from '../../util/airportUtils';

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

  useEffect(() => {
    if (airport === undefined) {
      dispatch(fetchAirport(icao));
    }
  }, [airport, icao, dispatch]);

  if (airportStatus === Status.loading || airport === undefined)
    return <Typography variant='h2'>Loading...</Typography>;

  return (
    <PageContainer>
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
      <Typography variant='h6'>Available runways:</Typography>
      <div className='available-runways-cards'>
        { airport.runways.map(rwy => <RunwayCard key={rwy.ident} {...rwy} />) }
      </div>
    </PageContainer>
  );
};

export default AirportDetails;
