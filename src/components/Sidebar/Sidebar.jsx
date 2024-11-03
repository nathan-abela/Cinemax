import React from 'react';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/tmdb';

// Logos for light and dark themes
import lightLogo from '../../assets/images/Cinemax_Logo_Blue.svg';
import darkLogo from '../../assets/images/Cinemax_Logo_Red.svg';

import genreIcons from '../../assets/genres';
import categoryIcons from '../../assets/categories';

// TODO: Invert Categories and Genres usage
// Mock data for categories and genres
const mockCategories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

// const mockGenres = [
//   { label: 'Comedy', value: 'comedy' },
//   { label: 'Action', value: 'action' },
//   { label: 'Horror', value: 'horror' },
//   { label: 'Animation', value: 'animation' },
// ];

function Sidebar() {
  const theme = useTheme(); // Get current theme (dark/ light mode)
  const classes = useStyles(); // Import custom styles

  const { data, isFetching } = useGetGenresQuery();

  console.log('~ getGenres:', useGetGenresQuery());

  return (
    <>
      {/* Cinemax Logo - Changes based on the theme */}
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
          alt="Cinemax Logo"
        />
      </Link>

      <Divider />

      {/* Categories List */}
      <List>
        <ListSubheader>Categories</ListSubheader>
        {mockCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button> {/* TODO: Add navigation */}
              <ListItemIcon>
                <img src={categoryIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      {/* Genres List */}
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name }) => (
          <Link key={name} className={classes.links} to="/">
            <ListItem onClick={() => {}} button> {/* TODO: Add navigation */}
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
