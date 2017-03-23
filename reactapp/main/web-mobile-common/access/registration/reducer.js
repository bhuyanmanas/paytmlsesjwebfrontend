import {
  UPDATE_REGISTRATION_ERROR,
  UPDATE_EMAIL_AVAILABLE_ERROR,
  UPDATE_USERNAME_AVAILABLE_ERROR } from './types';

const INITIAL_STATE = {
  error: '',
  emailAvailableError: '',
  usernameAvailableError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_EMAIL_AVAILABLE_ERROR:
      return {
        ...state,
        emailAvailableError: action.payload
      };
    case UPDATE_USERNAME_AVAILABLE_ERROR:
      return {
        ...state,
        usernameAvailableError: action.payload
      };
    default:
      return state;
  }
};
