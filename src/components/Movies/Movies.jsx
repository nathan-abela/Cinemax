import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { MovieList } from '../index';
import { useGetMoviesQuery } from '../../services/tmdb';

function Movies() {
  // Destructuring the response from the useGetMoviesQuery hook
  const { data, error, isFetching } = useGetMoviesQuery();

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
    <div><MovieList movies={data} /></div>
  );
}

export default Movies;
