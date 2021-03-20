import React from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../page-container/PageContainer';

const AirportDetails = (): React.ReactElement => {
  const { icao } = useParams<{ icao: string }>();

  return (
    <PageContainer>
      Hello!
    </PageContainer>
  )
}

export default AirportDetails;
