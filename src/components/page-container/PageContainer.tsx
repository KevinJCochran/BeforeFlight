import React from 'react';
import { Container, createStyles, makeStyles, Paper } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => createStyles({
  paperRoot: {
    padding: 20,
    marginTop: 16,
  }
}));

function PageContainer(props: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <Container>
      <Paper elevation={0} className={classes.paperRoot}>
        { props.children }
      </Paper>
    </Container>
  )
}

export default PageContainer;
