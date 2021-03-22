import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

interface Props {
  direction: number;
  speedKts: number;
  from: number;
  variable: boolean;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  }
});

const WeatherCards = (props: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <div>
          <Typography variant='h6'>Winds</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCards;
