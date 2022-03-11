export const LOGIN_BUTTON = 'LOGIN_BUTTON';
export const ADD_GRAVATAR = 'ADD_GRAVATAR';
export const ADD_TOKEN = 'ADD_TOKEN';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const loginButton = (value) => ({
  type: LOGIN_BUTTON,
  payload: value,
});

export const addTokenRequest = () => async (dispatch) => {
  const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await fetchAPI.json();
  localStorage.setItem('token', data.token);
  dispatch({
    type: ADD_TOKEN,
    payload: data.token,
  });
};

export const addCorrectAnswer = () => ({
  type: CORRECT_ANSWER,
});

export const addGravatar = (hashEmail) => ({
  type: ADD_GRAVATAR,
  payload: hashEmail,
});
