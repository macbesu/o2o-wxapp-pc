import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './components/styles/reset.css';
import './components/styles/common.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <BrowserRouter basename='/'>
      <Routes />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);

