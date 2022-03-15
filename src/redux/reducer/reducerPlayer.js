import { ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE: {
    const score = state.score + action.payload;
    localStorage.setItem('player', JSON.stringify({ score }));

    return { ...state, score };
  }
  default:
    return { ...state };
  }
};

export default player;
