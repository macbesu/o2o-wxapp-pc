import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import Nav from './components/Nav';

import './components/styles/reset.css';
import './components/styles/common.css';

injectTapEventPlugin();

const styles = {
  app: {
    width: '1360px',
    margin: '0 auto',
  },
  nav: {
    width: '200px',
    float: 'left',
  },
  content: {
    float: 'right',
  },
};

ReactDOM.render(
  <MuiThemeProvider>
    <div style={styles.app}>
      <Header />
      <div>
        <div style={styles.nav}>
          <Nav />
        </div>
        <div style={styles.content}>
          <HashRouter basename='/'>
            <Routes />
          </HashRouter>
        </div>
      </div>
    </div>
    
  </MuiThemeProvider>,
  document.getElementById('root')
);

