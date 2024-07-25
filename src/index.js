import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@rmwc/theme';
import { ApplicationStore } from 'data';
import { Provider } from 'react-redux';
import App from './App';

import '@rmwc/button/styles';
import '@rmwc/data-table/styles';
import '@rmwc/elevation/styles';
import '@rmwc/grid/styles';
import '@rmwc/list/styles';
import '@rmwc/textfield/styles';
import '@rmwc/theme/styles';
import '@rmwc/top-app-bar/styles';
import '@rmwc/typography/styles';
import themeConfig from 'styles/theme.scss';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ApplicationStore}>
      <ThemeProvider options={themeConfig}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);