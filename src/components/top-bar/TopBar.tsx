import React, { ReactElement } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import SearchInput from '../search-input/SearchInput';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  // offset will make sure nothing is hidden under the Top Bar
  offset: theme.mixins.toolbar,
}));

/*
* TopBar renders the top navigation bar which contains the search input.
* It handles changing the URL on search.
*/
const TopBar = (): ReactElement => {
  const classes = useStyles();

  const history = useHistory();

  const handleSearchSubmit = (value: string) => {
    history.push(`/airport/${value}`);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant='h6'>
            BeforeFlight
          </Typography>
          <SearchInput onSubmit={handleSearchSubmit}/>
        </Toolbar>
      </AppBar>
      {/* Create padding to push content down below Top Bar */}
      <div className={classes.offset}/>
    </>
  );
};

export default TopBar;
