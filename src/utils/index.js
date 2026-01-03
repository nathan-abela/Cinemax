import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

// Function to fetch a new request token
export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem('request_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}${process.env.PUBLIC_URL}/approved`;
    }
  } catch (error) {
    console.log('Your authentication token could not be created.', error);
  }
};

// Function to create a new session ID
// eslint-disable-next-line consistent-return
export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
        request_token: token,
      });

      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (error) {
      console.log('Your session ID could not be created.', error);
    }
  }
};
