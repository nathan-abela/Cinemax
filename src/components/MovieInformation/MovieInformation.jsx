import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie as MovieIcon, PlusOne, Remove, Theaters } from '@mui/icons-material';
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography } from '@mui/material';
import axios from 'axios';

import genreIcons from '../../assets/genres';
import { userSelector } from '../../features/auth';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetUserListQuery } from '../../services/tmdb';
import { MovieList } from '../index';
import useStyles from './styles';

function MovieInformation() {
  const classes = useStyles(); // Import custom styles
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // Trailer modal state
  const navigate = useNavigate(); // Navigate back to the previous page

  const { id } = useParams(); // Get the movie ID from the URL parameters
  const { data, isFetching, error } = useGetMovieQuery(id); // Fetch movie data using the movie ID
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({
    list: 'recommendations',
    movie_id: id,
  }); // Fetch recommended movies

  const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const sessionId = localStorage.getItem('session_id');

  const { user } = useSelector(userSelector); // Get the user data
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { data: favoriteMovies, refetch: refetchFavorited } = useGetUserListQuery(
    {
      accountId: user?.id,
      listName: 'favorite/movies',
      sessionId,
      page: 1,
    },
    { skip: !user },
  );
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUserListQuery(
    {
      accountId: user?.id,
      listName: 'watchlist/movies',
      sessionId,
      page: 1,
    },
    { skip: !user },
  );

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    if (!user) return;
    try {
      await axios.post(
        `${TMDB_API_BASE_URL}/account/${user.id}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
        {
          media_type: 'movie',
          media_id: id,
          favorite: !isMovieFavorited,
        },
      );
      setIsMovieFavorited((prev) => !prev);
    } catch (err) {
      console.error('Error adding movie to favorite:', err);
    }
  };

  const addToWatchlist = async () => {
    if (!user) return;
    try {
      await axios.post(
        `${TMDB_API_BASE_URL}/account/${user.id}/watchlist?api_key=${apiKey}&session_id=${sessionId}`,
        {
          media_type: 'movie',
          media_id: id,
          watchlist: !isMovieWatchlisted,
        },
      );
      setIsMovieWatchlisted((prev) => !prev);
    } catch (err) {
      console.error('Error adding movie to watchlist:', err);
    }
  };

  const getOfficialTrailer = () => {
    if (!data?.videos?.results) {
      return null;
    }

    // Get all trailers
    const trailers = data.videos.results.filter((video) => video.type === 'Trailer');

    // Prioritize the one explicitly named "Official Trailer"
    const officialTrailer = trailers.find((video) => video.name.toLowerCase() === 'official trailer');

    // Fallback to the most recent official trailer
    return officialTrailer || trailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))[0] || null;
  };
  const trailer = getOfficialTrailer();

  // Show a loading spinner while the movie data is still being fetched
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
          Something has gone wrong - Go back
        </Button>
      </Box>
    );
  }

  // If data is successfully fetched and contains the movie, render the movie data
  return (
    <Grid container className={classes.containerSpaceAround}>
      {/* Movie Poster */}
      <Grid item sm={12} lg={4} align="center">
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title || 'Movie Poster'}
        />
      </Grid>

      {/* Movie Details */}
      <Grid item container direction="column" lg={7}>
        {/* Movie Title and Tagline */}
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        {/* Movie Rating, Runtime and Language */}
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.1} />

            <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
              {data.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime
              ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
              : ''} | {' '}
            {data?.spoken_languages[0]?.name}
          </Typography>
        </Grid>

        {/* Movie Genres */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre?.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        {/* Movie Overview */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '32px' }}>
          {data?.overview}
        </Typography>

        {/* Top Cast */}
        <Typography variant="5h" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (
            character.profile_path && (
              <Grid
                key={i}
                item
                xs={4}
                md={2}
                component={Link}
                to={`/actors/${character.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className={classes.castImage}
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                />
                <Typography color="textPrimary">{character?.name}</Typography>
                {/* Show only the first actor name if multiple are provided */}
                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>

        {/* Buttons */}
        <Grid item container style={{ marginTop: '32px' }}>
          <div className={classes.buttonsContainer}>
            {/* External Links Buttons */}
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            {/* User Action Buttons (Favorites, Watchlist, Back) */}
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                {/* Toggle favorite state */}
                {/* TODO: Handle logic for when signed out - consider showing alert/ prompt login */}
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavourite' : 'Favourite'}
                </Button>
                {/* Toggle watchlist state */}
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                {/* Navigate back to homepage */}
                <Button endIcon={<ArrowBack />}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      {/* Movies Recommendation */}
      <Box marginTop="80px" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>

        {/* Loop through the recommended movies */}
        {/* eslint-disable no-nested-ternary */}
        {isRecommendationsFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="64px" />
          </Box>
        ) : recommendations?.results?.length > 0 ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box display="flex" justifyContent="center" marginTop="32px">
            <Typography variant="h6">
              No recommendations found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Movie Trailer */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {trailer && (
        <iframe
          autoPlay
          allow="autoplay"
          allowFullScreen
          className={classes.video}
          title="Trailer"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
        />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInformation;
