import { combineReducers } from 'redux';
import token from './reducerToken';
import user from './reducerUser';
import timer from './reducerTimer';
import player from './reducerPlayer';

const rootReducer = combineReducers({ user, token, timer, player });

export default rootReducer;
