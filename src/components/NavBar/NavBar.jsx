import React from 'react';

import { AppBar, IconButton, Toolbar, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

function NavBar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Check if the screen is mobile size
  const theme = useTheme(); // Get the current theme (dark/ light mode)
  const isAuthenticated = true; // TODO: Implement authentication logic

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        {/* Hamburger menu button for mobile screens */}
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => { }} // TODO: Implement menu functionality
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        )}

        {/* Dark/Light theme toggle button */}
        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          onClick={() => { }} // TODO: Implement theme toggle functionality
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Placeholder for search (non-mobile screens) */}
        {!isMobile && 'Search...'}

        <div>
          {/* Display login button if not authenticated */}
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => { }}> {/* TODO: Implement login logic */}
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/profile/:id" // TODO: Dynamically set user profile ID
              className={classes.linkButton}
              onClick={() => { }} // TODO: Handle profile click
            >
              {/* Show 'My Movies' on larger screens */}
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" // TODO: Replace with actual profile image
              />
            </Button>
          )}
        </div>

        {/* Placeholder for search (non-mobile screens) */}
        {!isMobile && 'Search...'}

      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
