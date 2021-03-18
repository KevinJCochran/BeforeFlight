import React, { ReactElement } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

// This will make sure nothing is hidden under the Top Bar
const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

const TopBar = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant='h6'>BeforeFlight</Typography>
        </Toolbar>
      </AppBar>
      {/* Create padding to push content down below Top Bar */}
      <div className={classes.offset} />
    </>
  )
}

export default TopBar;