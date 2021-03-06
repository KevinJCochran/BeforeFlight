import React, { useState } from 'react';
import { fade, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  onSubmit: (value: string) => void,
}

/*
* I was on the fence about using CSS-in-JS, however
* it does provide an easy way to maintain a theme without
* using SASS or CSS variables. Overall, I'd say I'm a fan.
*/
const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: '1rem',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/*
* SearchInput renders a search input meant for the top bar of
* the app. It only listens for form submission.
*/
const SearchInput = (props: Props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  return (
    <form
      className={classes.search}
      onSubmit={(e) => {
        // Important to prevent page reload!
        e.preventDefault();
        props.onSubmit(value.trim());
      }}
    >
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder="Press enter to search.."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
