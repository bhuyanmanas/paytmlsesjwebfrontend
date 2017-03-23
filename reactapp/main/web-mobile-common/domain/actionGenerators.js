import { postObject } from '../socket/actionGenerators';
import { CLEAR_SEARCH_TERMS, UPDATE_SEARCH_TEXT } from './types';

export const updateSearchText = (payload) => {
  return {
    type: UPDATE_SEARCH_TEXT,
    payload
  }
};

export const fetchRandomWord = () => {
  return postObject({
    messageType: 'toServerFetchRandomWord'
  });
}

export const searchTwitter = (searchText) => {
    return postObject({
        messageType: 'toServerSearchTwitter',
        searchText });
};

export const saveSearchTerm = (searchText) => {
    return postObject({
        messageType: 'toServerSaveSearchTerm',
        searchText });
};

export const retrieveSearchTerms = () => {
    return postObject({
        messageType: 'toServerRetrieveSearchTerms'
    });
};

export const clearSearchTerms = () => {
    return {
        type: CLEAR_SEARCH_TERMS
    };
};
