import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

import { searchMovie } from '../../features/currentGenreOrCategory';
import useStyles from './styles';

function Search() {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== '/' && location.pathname !== '/approved') {
    return null;
  }

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
