import React from 'react';
import { createStyles, Divider, makeStyles, Typography } from '@material-ui/core';

import PageContainer from '../page-container/PageContainer';
import AirportCard from '../airport-card/AirportCard';

const useStyles = makeStyles(() => createStyles({
  dividerRoot: {
    marginBottom: '1rem',
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <PageContainer>
      <Typography variant='h4'>Airport Directory</Typography>
      <Divider className={classes.dividerRoot} />
      <AirportCard name='William P Hobby' icao='KHOU' />
    </PageContainer>
  )
}

export default Home;
