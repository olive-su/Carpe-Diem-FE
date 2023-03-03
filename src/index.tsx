import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './store/store';
import LoadUser from './services/loadUser';
import config from './config';

LoadUser();

axios.defaults.baseURL = config.node_env !== 'production' ? '/' : `${config.server.protocol}://${config.server.host}:${config.server.port}`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
