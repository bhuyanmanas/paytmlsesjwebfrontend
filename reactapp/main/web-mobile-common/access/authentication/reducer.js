import validator from 'validator';

import {
  UPDATE_USERNAME_OR_EMAIL,
  LOGIN_USER,
  INVALID_CREDENTIALS,
  LOGIN_ERROR,
  UPDATE_LOGIN_ERROR,
  LOGOUT_USER,
  SOCKET_LOGGING_OUT,
  PASSWORD_RESET_FAILED_UPDATE,
  PASSWORD_CHANGE_FAILED,
  PASSWORD_RESET_SUCCESSFUL } from './types';
import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_EMAIL,
  UPDATE_CODE } from '../types';

const INITIAL_STATE = {
  error: '',
  email: '',
  username: '',
  usernameOrEmail: '',
  password: '',
  user: null,
  code: '',
  resetCodeError: '',
  passwordChangeError: ''
};

export default (state = INITIAL_STATE, action) => {
  const email =
    (typeof (action.payload) === 'string' &&
     validator.isEmail(action.payload)) ? action.payload : '';
  const username =
    (typeof (action.payload) === 'string' &&
     validator.isEmail(action.payload)) ? '' : action.payload;
  switch (action.type) {
    case LOGOUT_USER:
      return INITIAL_STATE;
    case SOCKET_LOGGING_OUT:
      return INITIAL_STATE;
    case UPDATE_CODE:
      return {
        ...state,
        code: action.payload
      };
    case UPDATE_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case LOGIN_USER:
      return {
        ...INITIAL_STATE,
        user: action.payload,
        username: action.payload.username,
        email: action.payload.email
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case INVALID_CREDENTIALS:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_USERNAME_OR_EMAIL:
      return {
        ...state,
        email,
        username,
        usernameOrEmail: action.payload
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case PASSWORD_RESET_FAILED_UPDATE: {
      return {
        ...state,
        resetCodeError: action.payload
      };
    }
    case PASSWORD_RESET_SUCCESSFUL:
      return {
        ...state,
        resetCodeError: ''
      };
    case PASSWORD_CHANGE_FAILED: {
      return {
        ...state,
        passwordChangeError: 'Incorrect password'
      };
    }
    default:
      return state;
  }
};
