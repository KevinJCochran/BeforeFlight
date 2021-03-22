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

/*
* Home is a component that loads all airports for easier
* navigation through the app.
*/
function Home() {
  const classes = useStyles();

  const airports = useAppSelector(state => Object.values(state.airports.map));
  const airportsStatus = useAppSelector(state => state.airports.status);
  const dispatch = useAppDispatch();

  // This hook ensures that airports are only loaded on mount
  useEffect(() => {
    if (airports.length === 0 && airportsStatus === Status.successful) {
      dispatch(fetchAirportList());
    }
  }, [airports, airportsStatus, dispatch]);

  const renderList = () => {
    return airports.map(a => <AirportCard key={a.code} name={a.name} code={a.code}/>);
  };

  let content;

  if (airportsStatus === Status.loading) {
    content = <Typography variant='h4'>Loading all airports...</Typography>;
  } else if (airportsStatus === Status.failed) {
    content = <Typography variant='h4' color='error'>Failed to load airport directory</Typography>;
  } else {
    content = renderList();
  }

  return (
    <PageContainer>
      <Typography variant='h4'>Airport Directory</Typography>
      <Divider className={classes.dividerRoot}/>
      <div className='airport-list-container'>
        {content}
      </div>
    </PageContainer>
  );
}

export default Home;
