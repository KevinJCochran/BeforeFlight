import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

interface Props {
  name: string,
  recipName: string,
  length: number,
  width: number,
}

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  }
});

const RunwayCard = (props: Props): React.ReactElement => {
  const classes = useStyles();
  return (
    <Card classes={classes}>
      <CardContent>
        <Typography variant='h6'>{props.name} - {props.recipName}</Typography>
        <Typography variant='subtitle2'>{props.length}' x {props.width}'</Typography>
      </CardContent>
    </Card>
  );
};

export default RunwayCard;