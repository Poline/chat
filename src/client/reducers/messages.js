//TYPES
export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_SUCCEEDED = 'GET_MESSAGES_SUCCEEDED';
export const GET_MESSAGES_FAILED = 'GET_MESSAGES_FAILED';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCEEDED = 'SEND_MESSAGE_SUCCEEDED';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

//REDUCER
const messages = (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCEEDED: return action.chats;
    case SEND_MESSAGE_SUCCEEDED: return action.chats;
    default: return state;
  }
}

//ACTIONS
export const getMessages = (credentials) => {
  return { type: GET_MESSAGES, credentials };
}
export const sendMessages = (credentials) => {
  return { type: SEND_MESSAGE, credentials };
}

export default messages;