import { combineReducers } from 'redux';
import { LOGIN_BUTTON, ADD_GRAVATAR, CORRECT_ANSWER } from '../actions';
import token from './reducerToken';

export const INITIAL_STATE = {
  email: '',
  name: '',
  hashEmail: '',
  assertions: 0,
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
  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ user, token });

export default rootReducer;
