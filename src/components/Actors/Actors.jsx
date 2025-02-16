import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Movie as MovieIcon } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import { useGetActorsDetailsQuery, useGetMoviesByActorsIdQuery } from '../../services/tmdb';
import { MovieList, Pagination } from '../index';
import useStyles from './styles';

function Actors() {
  const classes = useStyles(); // Import custom styles
  const [page, setPage] = useState(1);

  const { id } = useParams(); // Get the actor ID from the URL parameters
  const navigate = useNavigate(); // Navigate back to the previous page

  const { data, isFetching, error } = useGetActorsDetailsQuery(id); // Fetch actor data by actor ID
  const { data: movies, isMoviesFetching } = useGetMoviesByActorsIdQuery({ actorsId: id, page }); // Fetch movies by actor ID

  // Show a loading spinner while the actor data is still being fetched
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="128px" />
      </Box>
    );
  }

  // If there is an error fetching the data, display a simple error message
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          {/* Actor Image */}
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>

        {/* Actor Information */}
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          {/* Birthdate  */}
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toLocaleDateString()}
          </Typography>
          {/* Actor Biography */}
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>

          {/* Buttons */}
          <Box marginTop="32px" display="flex" justifyContent="space-around">

            {/* IMDB Button - Opens actor IMDB page */}
            <Button
              color="primary"
              variant="outlined"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              endIcon={<MovieIcon />}
            >
              IMDB
            </Button>
            {/* Navigates to the previous page */}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
              endIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Movies the Actor has starred in */}
      <Box margin="32px 0">
        <Typography variant="h3" align="center" gutterBottom>
          Also Featured In
        </Typography>

        {/* eslint-disable no-nested-ternary */}
        {isMoviesFetching ? (
          // Show loading spinner while fetching actor movies
          <Box display="flex" justifyContent="center">
            <CircularProgress size="64px" />
          </Box>
        ) : movies && movies?.results?.length > 0 ? (
          <>
            <MovieList movies={movies} numberOfMovies={12} />
            <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
          </>
        ) : (
          <Box display="flex" justifyContent="center" marginTop="32px">
            <Typography variant="h6">
              Sorry, no movies found featuring {data?.name}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Actors;
