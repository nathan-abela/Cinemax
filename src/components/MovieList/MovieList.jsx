import React from 'react';
import { Grid } from '@mui/material';

import { Movie } from '../index';
import useStyles from './styles';

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles(); // Import custom styles

  return (
    <Grid container className={classes.moviesContainer}>
      {/* Rendering the Movie component for each movie in the results array */}
      {/* Passing the current movie object and its index (i) as props */}
      {movies?.results?.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
