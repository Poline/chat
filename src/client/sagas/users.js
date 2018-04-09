import { put, takeEvery } from 'redux-saga/effects';
import {
  GET_USERS,
  GET_USERS_SUCCEEDED,
  GET_USERS_FAILED,
} from '../reducers/users';

function* getUsers({ credentials }) {
  try {
    const users = yield fetch('/api/users/userslist', {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => res.json());
    console.log(users);
    yield put({type: GET_USERS_SUCCEEDED, users});
  } catch (e) {
    console.log(e.message);
    yield put({type: GET_USERS_FAILED});
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, getUsers);
}

export default usersSaga;
