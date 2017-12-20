import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter basename='/'>
      <Routes />
    </HashRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);