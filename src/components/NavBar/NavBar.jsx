import React, { useState } from 'react';

import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import { Search, Sidebar } from '../index';
import useStyles from './styles';

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles(); // Import custom styles
  const isMobile = useMediaQuery('(max-width: 600px)'); // Check if the screen is mobile size
  const theme = useTheme(); // Get current theme (dark/ light mode)
  const isAuthenticated = true; // TODO: Implement authentication logic

  return (
    <>
      {/* Top AppBar */}
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {/* Hamburger menu button for mobile screens */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
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

          {!isMobile && <Search />}

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

          {isMobile && <Search />}

        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default NavBar;
