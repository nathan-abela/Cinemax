import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useTheme } from '@mui/styles';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/tmdb';
import useStyles from './styles';

// Logos for light and dark themes
import lightLogo from '../../assets/images/Cinemax_Logo_Blue.svg';
import darkLogo from '../../assets/images/Cinemax_Logo_Red.svg';

import categoryIcons from '../../assets/categories';
import genreIcons from '../../assets/genres';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme(); // Get current theme (dark/ light mode)
  const classes = useStyles(); // Import custom styles

  const { data: genresData, isFetching: isFetchingGenres } = useGetGenresQuery();
  const dispatch = useDispatch(); // To transfer data from component to Redux

  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  // Close mobile menu when a category or genre is selected
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <Box className={classes.sidebar}>
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
        {categories?.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
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
        {isFetchingGenres ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : genresData.genres.map(({ name, id }) => (
          <Link key={name} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
