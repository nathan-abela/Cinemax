import React from 'react';
import { Box, Typography } from '@mui/material';

import { Movie } from '../index';

function RatedCards({ title, movies }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Box display="flex" flexWrap="wrap">
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
