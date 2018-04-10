import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import chats from './chats';

const rootReducer = combineReducers({
  users,
  user,
  chats,
});

export default rootReducer;
