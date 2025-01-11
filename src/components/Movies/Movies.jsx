import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';

import { useGetMoviesQuery } from '../../services/tmdb';
import { MovieList } from '../index';

function Movies() {
  const [page] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);

  // Destructuring the response from the useGetMoviesQuery hook
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const lg = useMediaQuery((theme) => theme.breakpoints.up('lg')); // Detect large screens (lg breakpoint and up)
  const numberOfMovies = lg ? 16 : 18; // If large screen, show 18 movies; otherwise, show 16

  // Show a loading spinner while the movies data is still being fetched
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // If no movies are found, show a message to the user
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies found that much that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  // If there is an error fetching the data, display a simple error message
  if (error) {
    return 'An error has occurred';
  }

  // If data is successfully fetched and contains movies, render the MovieList component with the movies data
  return (
    <div><MovieList movies={data} numberOfMovies={numberOfMovies} /></div>
  );
}

export default Movies;
