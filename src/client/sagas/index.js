import { fork, all } from 'redux-saga/effects';
import userSaga from './user';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(usersSaga)]);
}
