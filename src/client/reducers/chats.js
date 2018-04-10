//TYPES
export const CREATE_CHAT = 'CREATE_CHAT';
export const CREATE_CHAT_SUCCEEDED = 'CREATE_CHAT_SUCCEEDED';
export const CREATE_CHAT_FAILED = 'CREATE_CHAT_FAILED';
export const GET_CHATS = 'GET_CHATS';
export const GET_CHATS_SUCCEEDED = 'GET_CHATS_SUCCEEDED';
export const GET_CHATS_FAILED = 'GET_CHATS_FAILED';

//REDUCER
const chats = (state = [], action) => {
  switch (action.type) {
    case CREATE_CHAT_SUCCEEDED: return action.chats;
    case GET_CHATS_SUCCEEDED: return action.chats;
    default: return state;
  }
}

//ACTIONS
export const createChat = (credentials) => {
  return { type: CREATE_CHAT, credentials };
}
export const getChats = (credentials) => {
  return { type: GET_CHATS, credentials };
}

export default chats;