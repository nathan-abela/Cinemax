import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';
import ToggleColorMode from './utils/ToggleColorMode';

// Retrieve the root element from '/public/index.html'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with ToggleColorMode for MUI theming
root.render(
  <Provider store={store}>
    <ToggleColorMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorMode>
  </Provider>,
);
