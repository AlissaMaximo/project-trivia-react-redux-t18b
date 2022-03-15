import { IS_TIME_OVER } from '../actions';

const INITIAL_STATE = {
  isTimeOver: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_TIME_OVER:
    return { isTimeOver: !state.isTimeOver };

  default:
    return state;
  }
};

export default timer;
