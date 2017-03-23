import { combineReducers } from 'redux';

import AuthenticationReducer from '../access/authentication/reducer';
import RegistrationReducer from '../access/registration/reducer';
import ActivationReducer from '../access/activation/reducer';
import LastActionReducer from '../socket/lastActionReducer';
import SocketReducer from '../socket/reducer';
import TwitterSearchReducer from '../domain/reducer';

export default combineReducers({
  authentication: AuthenticationReducer,
  registration: RegistrationReducer,
  activation: ActivationReducer,
  lastAction: LastActionReducer,
  socket: SocketReducer,
  twitterSearch: TwitterSearchReducer
});
