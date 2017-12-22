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

injectTapEventPlugin();

const styles = {
  app: {
    width: '1140px',
    margin: '0 auto',
  },
  main: {
    display: 'flex',
  },
  nav: {
    width: '360px',
  },
  content: {
    flex: '1',
  },
};

ReactDOM.render(
  <MuiThemeProvider>
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
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

