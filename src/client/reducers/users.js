//TYPES
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

//REDUCER
const users = (state = {list: []}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED: return {list: action.users}
    default: return state;
  }
}

//ACTIONS
export const getUsers = () => {
  return { type: GET_USERS };
}

export default users;
