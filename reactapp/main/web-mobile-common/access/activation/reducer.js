import {
  UPDATE_CODE,
  UPDATE_ACTIVATION_ERROR,
  ACCOUNT_ACTIVATION_SUCCESSFUL,
  UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION } from './types';
import {
  LOGOUT_USER } from '../authentication/types';

const INITIAL_STATE = {
  code: '',
  error: '',
  emailAvailableError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return INITIAL_STATE;
    case ACCOUNT_ACTIVATION_SUCCESSFUL:
      return INITIAL_STATE;
    case UPDATE_ACTIVATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_CODE:
      return {
        ...state,
        code: action.payload
      };
    case UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION:
      return {
        ...state,
        emailAvailableError: action.payload
      };
    default:
      return state;
  }
};
