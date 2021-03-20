import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

interface Props {
  name: string,
  code: string,
}

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  }
});

function AirportCard(props: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <Card classes={classes}>
      <CardContent>
        <Typography variant='h5'>{props.code}</Typography>
        <Typography variant='subtitle1' color='textSecondary'>{props.name}</Typography>
      </CardContent>
    </Card>
  );
}

export default AirportCard;
