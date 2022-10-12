import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './scss/styles.scss';
import { store } from './redux/store';
import { Provider } from 'react-redux';
//store passed in for redux toolkit
//browserrouter enabling react router
render(
  <BrowserRouter>
    <Provider store = {store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);