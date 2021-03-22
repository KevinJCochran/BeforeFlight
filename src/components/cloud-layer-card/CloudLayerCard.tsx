import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import { CloudCoverage } from '../../types/weatherTypes';

interface Props {
  coverage: CloudCoverage;
  altitudeFt: number;
  ceiling: boolean;
}

const useStyles = makeStyles({
  root: {
    width: 200,
  }
});

export const CloudLayerCard = (props: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card classes={classes}>
      <CardContent>
        <Typography variant='h4'>{props.coverage}</Typography>
        <Typography variant='subtitle1'>{props.altitudeFt}ft</Typography>
      </CardContent>
    </Card>
  );
};

export default CloudLayerCard;
