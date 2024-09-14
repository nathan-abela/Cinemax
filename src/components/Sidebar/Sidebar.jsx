import React, { useEffect } from 'react';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import useStyles from './styles';

// Mock data for categories and genres
const mockCategories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const mockGenres = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

// Logos for light and dark themes
const lightLogo = ''; // TODO: Add light mode logo
const darkLogo = ''; // TODO: Add dark mode logo

function Sidebar({ setMobileOpen }) {
  const theme = useTheme(); // Get current theme (dark/ light mode)
  const classes = useStyles(); // Import custom styles

  return (
    <>
      {/* CineMax Logo - Changes based on the theme */}
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
          alt="CineMax Logo"
        />
      </Link>

      <Divider />

      {/* Categories List */}
      <List>
        <ListSubheader>Categories</ListSubheader>
        {mockCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button> {/* TODO: Add navigation */}
              {/* <ListItemIcon>
                <img src={darkLogo} className={classes.genreImage} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      {/* Genres List */}
      <List>
        <ListSubheader>Genres</ListSubheader>
        {mockGenres.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button> {/* TODO: Add navigation */}
              {/* <ListItemIcon>
                <img src={darkLogo} className={classes.genreImage} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
