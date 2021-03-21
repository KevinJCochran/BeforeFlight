import React, { useEffect } from 'react';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';

import PageContainer from '../page-container/PageContainer';
import AirportCard from '../airport-card/AirportCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAirportList, Status } from '../../redux/airportSlice';

import './Home.css';

const useStyles = makeStyles(() => createStyles({
  dividerRoot: {
    marginBottom: '1rem',
  }
}));

function Home() {
  const classes = useStyles();

  const airports = useAppSelector(state => Object.values(state.airports.map));
  const airportsStatus = useAppSelector(state => state.airports.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (airports.length === 0 && airportsStatus === Status.successful) {
      dispatch(fetchAirportList());
    }
  }, [airports, airportsStatus, dispatch]);

  const renderList = () => {
    return airports.map(a => {
      const code = a.icao || a.iata || a.faaCode || a.name;
      return <AirportCard key={a.code} name={a.name} code={code}/>;
    });
  };

  return (
    <PageContainer>
      <Typography variant='h4'>Airport Directory</Typography>
      <Divider className={classes.dividerRoot}/>
      <div className='airport-list-container'>
        {renderList()}
      </div>
    </PageContainer>
  );
}

export default Home;
