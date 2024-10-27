import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function Movie({ movie, i }) {
  const classes = useStyles(); // Import custom styles

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      {/* Grow animation for a staggered fade-in effect for each movie card */}
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          {/* Movie poster image; if not available, a placeholder image is used */}
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // TMDB image URL if poster exists
                : 'https://fillmurray.deno.dev/200/300' // Placeholder image in case poster_path is missing
            }
          />
          <Typography className={classes.title} variant="h5">{movie.title}</Typography>

          {/* Tooltip showing the movie average rating out of 10 on hover */}
          <Tooltip disableTouchListener title={`${movie.vote_average.toFixed(1)} / 10`}>
            <div>
              {/* Star rating 1 decimal point, scaled to 5 stars (movie.vote_average is out of 10, so divided by 2) */}
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
