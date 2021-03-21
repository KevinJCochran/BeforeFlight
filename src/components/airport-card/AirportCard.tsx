import React from 'react';
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
      <CardActions>
        <Link to={`/airport/${props.code}`}>
          <Button size="small">More info</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default AirportCard;
