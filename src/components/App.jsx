import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes as Switch } from 'react-router-dom';

import useAlan from './Alan';
import useStyles from './styles';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';

function App() {
  const classes = useStyles(); // Applying custom Material-UI styles
  const alanBtnContainer = useRef();

  useAlan(); // Initialize Alan AI SDK for voice commands

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
          <Route exact path="/approved" element={<Movies />} /> {/* Approved authentication */}
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
