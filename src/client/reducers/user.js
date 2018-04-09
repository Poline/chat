//TYPES
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const AUTHORIZE = 'AUTHORIZE';
export const AUTHORIZE_SUCCEEDED = 'AUTHORIZE_SUCCEEDED';
export const AUTHORIZE_FAILED = 'AUTHORIZE_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

//REDUCER
const user = (state = {name: null, email: null, last_login_at: null }, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCEEDED: return Object.assign({}, state, action.user);
    case SIGN_IN_SUCCEEDED: return Object.assign({}, state, action.user);
    case AUTHORIZE_SUCCEEDED: return Object.assign({}, state, action.user);
    case LOGOUT_SUCCEEDED: return {name: null, email: null, last_login_at: null }
    default: return state;
  }
}

//ACTIONS
export const signUp = (credentials) => {
  return { type: SIGN_UP, credentials };
}
export const signIn = (credentials) => {
  return { type: SIGN_IN, credentials };
}
export const authorize = () => {
  return { type: AUTHORIZE };
}
export const logout = () => {
  return { type: LOGOUT };
}

export default user;