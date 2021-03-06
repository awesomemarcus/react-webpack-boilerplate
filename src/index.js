import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import '../public/assets/styles/css/index.css';
import '../public/assets/styles/sass/index.scss';

import App from './App';
import store from './store';

render(
  <Provider store={store}>
    <App />
  </Provider> ,
  document.getElementById('app-root'),
);
