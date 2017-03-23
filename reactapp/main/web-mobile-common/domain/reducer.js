import moment from 'moment'
import { ADD_SEARCH_TERM, CLEAR_SEARCH_TERMS, SEARCH_RESULTS } from './types';
import { LOGOUT_USER, SOCKET_LOGGING_OUT } from '../access/authentication/types';

const INITIAL_STATE = {
    savedSearchTerms: [],
    searchResults: []
};

const sortDesc = (a, b) => { return b.createdAt - a.createdAt };

const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return INITIAL_STATE;
        case SOCKET_LOGGING_OUT:
            return INITIAL_STATE;
        case ADD_SEARCH_TERM:
            const newSearchTerm = action.payload;
            return {
                ...state,
                savedSearchTerms: removeDuplicates(state.savedSearchTerms.concat([newSearchTerm]).sort(sortDesc), 'createdAt')
            };
        case CLEAR_SEARCH_TERMS:
            return {
                ...state,
                savedSearchTerms: []
            };
        case SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload.sort(sortDesc).map(searchResult => {
                    return { id: searchResult.id,
                    author: searchResult.author,
                    text: searchResult.text,
                    createdAt: moment(searchResult.createdAt).format('MMMM Do YYYY, h:mm:ss a') }})
            };
        default:
            return state;
    }
}