import * as actions from './actions';
import { combineReducers } from 'redux';

export const initialState = {
  active: null, // id of current user
  allIds: [],
  byId: {},
};

export function active(state = initialState.active, action) {
  switch (action.type) {
    case actions.SIGNIN:
    case actions.SIGNUP:
      return action.payload.id;
    case actions.LOGOUT:
      return null;
    default:
      return state;
  }
}

export function allIds(state = initialState.allIds, action) {
  switch (action.type) {
    case actions.SIGNUP:
      return [...state, action.payload.id];
    case actions.SIGNIN:
    case actions.LOGOUT:
      return state;
    default:
      return state;
  }
}

export function byId(state = initialState.byId, action) {
  switch (action.type) {
    case actions.SIGNUP:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case actions.SIGNIN:
    case actions.LOGOUT:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  active,
  allIds,
  byId,
});

// Selectors
// Probably better to use Reselect
export const isAuthenticated = state => !!state.active;
export const getUserById = (state, id) => state.byId[id];
export const getUserIdByUsername = (state, username) =>
  Object.keys(state.byId).find(id => state.byId[id].username === username);
