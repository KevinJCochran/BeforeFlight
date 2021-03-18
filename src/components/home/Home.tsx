import React from 'react';
import PageContainer from '../page-container/PageContainer';
import { Divider, Typography } from '@material-ui/core';

function Home() {
  return (
    <PageContainer>
      <Typography variant='h4'>Airport Directory</Typography>
      <Divider />
    </PageContainer>
  )
}

export default Home;