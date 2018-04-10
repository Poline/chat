//TYPES
export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_SUCCEEDED = 'GET_MESSAGES_SUCCEEDED';
export const GET_MESSAGES_FAILED = 'GET_MESSAGES_FAILED';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCEEDED = 'SEND_MESSAGE_SUCCEEDED';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';

//REDUCER
const messages = (state = [], action) => {
  debugger
  switch (action.type) {
    case GET_MESSAGES_SUCCEEDED: return action.messages;
    case SEND_MESSAGE_SUCCEEDED: return action.messages;
    case LOGOUT_SUCCEEDED: return [];
    default: return state;
  }
}

//ACTIONS
export const getMessages = (credentials) => {
  return { type: GET_MESSAGES, credentials };
}
export const sendMessage = (credentials) => {
  return { type: SEND_MESSAGE, credentials };
}

export default messages;