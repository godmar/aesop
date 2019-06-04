import React from 'react';

// as per https://malloc.fi/using-google-analytics-with-next-js
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-141356428-1')
}

function autoInit() {
  if (!window.GA_INITIALIZED) {
    initGA()
    window.GA_INITIALIZED = true
  }
}

export const logPageView = () => {
  autoInit();
  // console.log('Logging pageview for ${window.location.pathname}')
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  autoInit();
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  autoInit();
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}

export default () => {
  logPageView();
  return <React.Fragment />;
}

