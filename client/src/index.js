import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ContextProvider } from './context/ChannelContext';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

