import { IS_TIME_OVER, RESET_TIMER_FALSE, RESET_TIMER_TRUE } from '../actions';

const INITIAL_STATE = {
  isTimeOver: false,
  resetTimer: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_TIME_OVER:
    return { isTimeOver: !state.isTimeOver };
  case RESET_TIMER_TRUE:
    return {
      ...state,
      resetTimer: true,
      isTimeOver: false,
    };
  case RESET_TIMER_FALSE:
    return {
      ...state,
      resetTimer: false,
    };
  default:
    return state;
  }
};

export default timer;
