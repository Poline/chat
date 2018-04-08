import { combineReducers } from 'redux';
import user from '../modules/Auth/reducer';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
