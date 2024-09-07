import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes as Switch } from 'react-router-dom';

import useStyles from './styles';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
