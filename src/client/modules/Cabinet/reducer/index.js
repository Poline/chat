//TYPES
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

//REDUCER
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SIGN_UP_SUCCEEDED: return action.user
    case SIGN_IN_SUCCEEDED: return action.user
    default: return state;
  }
}

//ACTIONS
export function signUp(credentials) {
  return { type: SIGN_UP, credentials };
}
export function signIn(credentials) {
  return { type: SIGN_IN, credentials };
}