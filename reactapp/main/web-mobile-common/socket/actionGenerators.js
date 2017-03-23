import { CONNECT, POST_OBJECT, IS_CONNECTED, IS_DISCONNECTED } from './types';
import { clearSearchTerms, retrieveSearchTerms } from '../domain/actionGenerators';

export const connectToSocket = () => {
  return {
    type: CONNECT
  };
};

export const postObject = (obj) => {
  return {
      type: POST_OBJECT,
      obj
  };
};

export const setIsConnected = () => {
  return {
    type: IS_CONNECTED
  };
};

export const setIsDisconnected = () => {
  return {
    type: IS_DISCONNECTED
  };
};

export const startUpActions = [
  clearSearchTerms,
  retrieveSearchTerms
];