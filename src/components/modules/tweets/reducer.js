import * as actions from './actions';
import { combineReducers } from 'redux';

export const initialState = {
  allIds: [],
  byId: {},
};

export function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case actions.CREATE_TWEET:
      return [...state, action.payload.id];
    default:
      return state;
  }
}

export function byId(state = initialState.byId, action) {
  switch (action.type) {
    case actions.CREATE_TWEET:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  allIds,
  byId,
});

// Selectors
// Probably better to use Reselect
export const getTweetById = (state, id) => state.byId[id];
export const getRepliesById = (state, id) =>
  getAllTweets(state).filter(tweet => tweet.replyToId === id);
export const getAllTweets = state =>
  state.allIds.map(id => getTweetById(state, id));
