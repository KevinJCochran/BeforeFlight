import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

interface Props {
  name: string;
  icao?: string;
  iata?: string;
}

const useStyles = makeStyles({
  root: {
    width: 300,
  }
})

function AirportCard(props: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <Card classes={classes}>
      <CardContent>
        <Typography variant='h5'>{props.icao || props.iata}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>{props.name}</Typography>
      </CardContent>
    </Card>
  )
}

export default AirportCard;
