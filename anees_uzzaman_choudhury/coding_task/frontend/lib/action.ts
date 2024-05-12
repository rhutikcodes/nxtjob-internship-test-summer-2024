// actions.js

// Action Types
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM';

// Action Creators
export const setSearchTerm = (term: any) => ({
  type: SET_SEARCH_TERM,
  payload: term
});

export const clearSearchTerm = () => ({
  type: CLEAR_SEARCH_TERM
});
