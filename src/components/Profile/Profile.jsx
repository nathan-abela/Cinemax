import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { userSelector } from '../../features/auth';
import { useGetUserListQuery } from '../../services/tmdb';
import { RatedCards } from '../index';

function Profile() {
  const { user } = useSelector(userSelector);
  console.log('~ user:', user);

  const { data: favoriteMovies, refetch: refetchFavorited } = useGetUserListQuery(
    {
      accountId: user.id,
      listName: 'favorite/movies',
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    },
  );
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUserListQuery(
    {
      accountId: user.id,
      listName: 'watchlist/movies',
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    },
  );

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  // Logs out the user by clearing local storage and redirecting to the home page.
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>

        <Button color="inherit" onClick={logOut}>
          Logout &nbsp;
          <ExitToApp />
        </Button>
      </Box>

      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography variant="h5">Add Favourites or watchlist some movies to see them here!</Typography>
        : (
          <Box>
            <Box>
              <RatedCards title="Favorite Movies" movies={favoriteMovies} />
              <RatedCards title="Watchlist" movies={watchlistMovies} />
            </Box>
          </Box>
        )}
    </Box>
  );
}

export default Profile;
