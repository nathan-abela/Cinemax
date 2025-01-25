import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/auth';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

import { tmdbApi } from '../services/tmdb';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    currentUser: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
