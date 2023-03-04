import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './store/store';
import LoadUser from './services/loadUser';
import config from './config';

axios.defaults.baseURL = config.node_env !== 'production' ? '/' : `${config.server.protocol}://${config.server.host}:${config.server.port}`;
LoadUser();
// axios.interceptors.response.use(
//     (response) => {
//         return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
//     },
//     (error) => Promise.reject(error),
// );

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
