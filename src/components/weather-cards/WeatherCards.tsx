import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import ToysIcon from '@material-ui/icons/Toys';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HotTubIcon from '@material-ui/icons/HotTub';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

import './WeatherCards.css';

interface BaseCardProps {
  title: string,
  icon?: React.ReactElement,
  children: React.ReactNode,
}

interface WindCardProps {
  direction: number,
  speedKts: number,
  from: number,
  variable: boolean,
}

interface VisibilityCardProps {
  distanceSm: number;
  prevailingVisSm: number;
}

interface TemperatureCardProps {
  tempC: number;
  dewpointC: number;
}

interface HumidityCardProps {
  relativeHumidity: number,
}

const useStyles = makeStyles({
  root: {
    width: 200,
  }
});

const BaseCard = (props: BaseCardProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Card classes={classes}>
      <CardContent>
        <div className='weather-card-header'>
          {props.icon}
          <Typography variant='h6' color='textSecondary'>{props.title}</Typography>
        </div>
        {props.children}
      </CardContent>
    </Card>
  );
};

export const WindCard = (props: WindCardProps): React.ReactElement => {
  return (
    <BaseCard title='Winds' icon={<ToysIcon/>}>
      <Typography variant='h3'>NW</Typography>
      <Typography variant='subtitle1'>210° @ 6 KTS</Typography>
    </BaseCard>
  );
};

export const VisibilityCard = (props: VisibilityCardProps): React.ReactElement => (
  <BaseCard title='Visibility' icon={<VisibilityIcon/>}>
    <Typography variant='h3' display='inline'>
      {props.distanceSm}
    </Typography>
    <Typography variant='subtitle1' display='inline'>
      SM
    </Typography>
  </BaseCard>
);

export const TemperatureCard = (props: TemperatureCardProps): React.ReactElement => (
  <BaseCard title='Temperature' icon={<HotTubIcon/>}>
    <Typography variant='h3' display='inline'>
      {props.tempC}
    </Typography>
    <Typography variant='subtitle1' display='inline'>
      &#730;C
    </Typography>
    <Typography variant='subtitle1'>
      Dewpoint: {props.dewpointC}&#730;C
    </Typography>
  </BaseCard>
);

export const HumidityCard = (props: HumidityCardProps): React.ReactElement => (
  <BaseCard title='Humidity' icon={<InvertColorsIcon/>}>
    <Typography variant='h3' display='inline'>
      {props.relativeHumidity}
    </Typography>
    <Typography variant='subtitle1' display='inline'>
      %
    </Typography>
  </BaseCard>
);
