// reducer.js

import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from './action';

const initialState = {
  searchTerm: ''
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case CLEAR_SEARCH_TERM:
      return {
        ...state,
        searchTerm: ''
      };
    default:
      return state;
  }
};

export default searchReducer;
