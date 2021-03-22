import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { cloudLayers } from '../../util/airportUtils';
import { CloudCoverage, CloudLayer } from '../../types/weatherTypes';

import CloudLayerCard from '../cloud-layer-card/CloudLayerCard';

import './CloudCoverage.css';

interface Props {
  cloudLayers?: CloudLayer[],
}

const CloudCoverageSummary = (props: Props): React.ReactElement => {
  const [greatestLayer, setGreatestLayer] = useState<CloudCoverage>('clr');

  useEffect(() => {
    if (props.cloudLayers === undefined) {
      setGreatestLayer('clr');
    } else {
      const { layer } = props.cloudLayers
        .map(layer => ({ layer: layer.coverage, size: cloudLayers[layer.coverage] }))
        .reduce((prevGreatest, currentLayer) => currentLayer.size > prevGreatest.size ? currentLayer : prevGreatest);
      setGreatestLayer(layer);
    }
  }, [props.cloudLayers]);

  if (props.cloudLayers === undefined)
    return (
      <Typography variant='h6'>
        Cloud coverage unavailable for this airport
      </Typography>
    );

  return (
    <>
      <Typography variant='body1'>
        Greatest coverage: {greatestLayer === 'clr' ? 'Sky clear' : greatestLayer}
      </Typography>
      <div className='cloud-coverage-cards'>
        {
          greatestLayer !== 'clr' &&
          props.cloudLayers.map(c => <CloudLayerCard key={c.altitudeFt} {...c}/>)
        }
      </div>
    </>
  );
};

export default CloudCoverageSummary;
