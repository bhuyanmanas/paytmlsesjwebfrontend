import { IS_CONNECTED, DISCONNECT, IS_DISCONNECTED } from './types';

const INITIAL_STATE = {
  isConnected: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_CONNECTED:
      return {
        ...state,
        isConnected: true
      };
    case DISCONNECT:
      return {
        ...state,
        isConnected: false
      };
    case IS_DISCONNECTED :
      return {
        ...state,
        isConnected: false
      };
    default:
      return state;
  }
};
