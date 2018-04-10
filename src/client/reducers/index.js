import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import chats from './chats';
import messages from './messages';

const rootReducer = combineReducers({
  users,
  user,
  chats,
  messages,
});

export default rootReducer;
