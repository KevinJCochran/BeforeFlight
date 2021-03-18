import React from 'react';
import { Container, makeStyles, Paper } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    padding: 20,
    marginTop: 16,
  }
})

function PageContainer(props: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={1} classes={classes}>
        { props.children }
      </Paper>
    </Container>
  )
}

export default PageContainer;