import { fork, all } from 'redux-saga/effects';
import userSaga from './user';
import usersSaga from './users';
import chatsSaga from './chats';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(usersSaga), fork(chatsSaga)]);
}
