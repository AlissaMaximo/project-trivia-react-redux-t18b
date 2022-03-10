import { combineReducers } from 'redux';
import { LOGIN_BUTTON, ADD_GRAVATAR } from '../actions';
import token from './reducerToken';

export const INITIAL_STATE = {
  email: '',
  name: '',
  hashEmail: '',
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_BUTTON:
    return {
      ...state,
      email: action.payload.email,
      name: action.payload.name,
    };
  case ADD_GRAVATAR:
    return {
      ...state,
      hashEmail: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ user, token });

export default rootReducer;
