import * as redux from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import reducers from '../web-mobile-common/reducers/index';

export var configure = (initialState = { }) => {
    // compose composes all of our middleware
    return redux.createStore(reducers, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

};
