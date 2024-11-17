import { createSlice } from '@reduxjs/toolkit';

// Defining a slice of the Redux store for managing genre or category state
export const genreOrCategory = createSlice({
  name: 'genreOrCategory', // Unique name for the slice
  initialState: { // Setting initial values for the slice
    genreIdOrCategoryName: '', // The selected genre ID or category name, ex. '20', 'Action', 'Comedy'
    page: 1, // Current page for pagination
    searchQuery: '', // Stores the search query, ex. 'The Lord of the Rings', 'The Godfather'
  },
  reducers: {
    // Reducer function to handle selecting a genre or category
    selectGenreOrCategory: (state, action) => {
      console.log('~ action.payload', action.payload);
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    // Function to handle searching for movies
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
