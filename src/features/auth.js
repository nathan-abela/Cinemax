import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
  user: {}, // Stores user information
  isAuthenticated: false, // Indicates if the user is authenticated
  sessionId: '', // Stores the session ID
};

// Defining a slice of the Redux store for managing authentication state
const authSlice = createSlice({
  name: 'user', // Unique name for the slice
  initialState, // Setting initial values for the slice
  reducers: {
    // Reducer function to handle setting the user
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export const userSelector = (state) => state.currentUser;

export default authSlice.reducer;
