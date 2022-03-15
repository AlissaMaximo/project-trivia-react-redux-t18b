import { ADD_SCORE, LOGIN_BUTTON, ADD_GRAVATAR, CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  hashEmail: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
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
  case ADD_SCORE: {
    const score = state.score + action.payload;
    localStorage.setItem('player', JSON.stringify({ score }));

    return { ...state, score };
  }
  default:
    return state;
  }
};

export default player;
