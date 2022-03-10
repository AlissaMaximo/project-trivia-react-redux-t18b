export const LOGIN_BUTTON = 'LOGIN_BUTTON';
export const ADD_GRAVATAR = 'ADD_GRAVATAR';

export const loginButton = (value) => ({
  type: LOGIN_BUTTON,
  payload: value,
});

// export const addGravatar = (email) => async (dispatch) => {
//   const fetchAPI = await fetch(`https://www.gravatar.com/avatar/${email}`);
//   const result = await fetchAPI.json();
//   dispatch({
//     type: ADD_GRAVATAR,
//     payload: result,
//   });
// };

export const addGravatar = (hashEmail) => ({
  type: ADD_GRAVATAR,
  payload: hashEmail,
});
