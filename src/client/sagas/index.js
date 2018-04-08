import { fork } from 'redux-saga/effects';
import { authSaga } from '../modules/Auth/sagas';

export default function* rootSaga() {
  yield [fork(authSaga)];
}
