import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes as Switch } from 'react-router-dom';

import useStyles from './styles';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';

function App() {
  const classes = useStyles(); // Applying custom Material-UI styles

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* Reset CSS for consistency across browsers */}

      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/* Define the various routes/ pages in the app */}
        <Switch>
          <Route exact path="/" element={<Movies />} /> {/* Home route showing movie list */}
          <Route exact path="/movie/:id" element={<MovieInformation />} /> {/* Movie details page */}
          <Route exact path="/actors/:id" element={<Actors />} /> {/* Actor information page */}
          <Route exact path="/profile/:id" element={<Profile />} /> {/* User profile page */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
