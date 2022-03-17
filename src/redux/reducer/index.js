import { combineReducers } from 'redux';
import token from './reducerToken';
import timer from './reducerTimer';
import player from './reducerPlayer';

const rootReducer = combineReducers({ token, timer, player });

export default rootReducer;
