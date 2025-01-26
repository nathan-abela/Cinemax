import React from 'react';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { userSelector } from '../../features/auth';

function Profile() {
  const { user } = useSelector(userSelector);
  console.log('~ user:', user);

  const favouriteMovies = []; // Placeholder for favourite movies

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

      {!favouriteMovies.length
        ? <Typography variant="h5">Add Favourites or watchlist some movies to see them here!</Typography>
        : <Box>Favourite Movies</Box>} {/* TODO: Implement favourite movies functionality */}
    </Box>
  );
}

export default Profile;
