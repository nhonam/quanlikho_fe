import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'proxy-polyfill';
import 'core-js';
import './polyfill'
import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { unregister } from './serviceWorker';
import { icons } from './assets/icons'
import { Provider } from 'react-redux'
import App from './App';
import store from './store'

React.icons = icons

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister();
