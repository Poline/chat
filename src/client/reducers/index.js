import { combineReducers } from 'redux';
import user from './user';
import users from './users';

const rootReducer = combineReducers({
  users,
  user,
});

export default rootReducer;
