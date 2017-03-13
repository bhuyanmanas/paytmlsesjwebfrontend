import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import promise from 'redux-promise';

import WSInstance from './main/socket/WS';
import * as ChatActions from './main/socket/socketActionGenerators';
import * as ActionTypes from './main/socket/socketActionTypes';
import { WS_ROOT_URL } from './main/ConfigurationPaths';
import { socketConfiguration } from './main/socket/socketConfiguration';
import { messageListener } from './main/store/messageListensers';

import routes from './routes';
import { LOGIN_USER } from './main/access/authentication/authenticationActionGenerators'

var store = require('configureStore').configure();

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const username = localStorage.getItem('username');
if (token) {
  store.dispatch({
    type: LOGIN_USER,
    email,
    username
  })
}

require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

const sock = socketConfiguration(store);

store.subscribe(() => sock.wsListener());
store.subscribe(() => messageListener(store));