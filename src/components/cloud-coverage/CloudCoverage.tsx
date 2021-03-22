import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { cloudLayers } from '../../util/airportUtils';
import { CloudCoverage, CloudLayer } from '../../types/weatherTypes';

import CloudLayerCard from '../cloud-layer-card/CloudLayerCard';

import './CloudCoverage.css';

interface Props {
  cloudLayers?: CloudLayer[],
}

/*
* CloudCoverageSummary handles the logic of how to render
* cloud coverage over an airport.
*/
const CloudCoverageSummary = (props: Props): React.ReactElement => {
  const [greatestLayer, setGreatestLayer] = useState<CloudCoverage>('clr');

  // Compute the greatest cloud coverage only if the props change
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

  // Show message if props are undefined (usually because weather conditions are unavailable)
  if (props.cloudLayers === undefined)
    return (
      <Typography variant='h6' color='error'>
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
          // Don't display clear skies as a cloud layer
          greatestLayer !== 'clr' &&
          props.cloudLayers.map(c => <CloudLayerCard key={c.altitudeFt} {...c}/>)
        }
      </div>
    </>
  );
};

export default CloudCoverageSummary;
