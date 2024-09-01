import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App';

// Retrieve ID from '/public/index.html'
ReactDom.render(<App />, document.getElementById('root'));
