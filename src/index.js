import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './app/store';
import App from './components/App';
import ToggleColorMode from './utils/ToggleColorMode';

import './index.css';

// Retrieve the root element from '/public/index.html'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Determine if the app is running in production mode
const isProd = process.env.NODE_ENV === 'production';

// Render the App component wrapped with ToggleColorMode for MUI theming
root.render(
  <Provider store={store}>
    <ToggleColorMode>
      {/* Using a basename in production for GitHub Pages deployment */}
      <BrowserRouter basename={isProd ? '/Cinemax' : ''}>
        <App />
      </BrowserRouter>
    </ToggleColorMode>
  </Provider>,
);
