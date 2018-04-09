import { put, takeEvery } from 'redux-saga/effects';
import {
  SIGN_UP,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED,
  SIGN_IN,
  SIGN_IN_SUCCEEDED,
  SIGN_IN_FAILED,
  AUTHORIZE,
  AUTHORIZE_SUCCEEDED,
  AUTHORIZE_FAILED,
} from '../reducer';

function* signUp({ credentials }) {
  try {
    const user = yield fetch('/api/auth/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .catch(e => {
        throw new Error(e.message);
      });

    console.log(user);
    yield put({type: SIGN_UP_SUCCEEDED, user});
  } catch (e) {
    console.log(e.message);
    yield put({type: SIGN_UP_FAILED});
  }
}

function* signIn({ credentials }) {
  try {
    const user = yield fetch('/api/auth/signin', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .catch(e => {
        throw new Error(e.message);
      });

    console.log(user);
    yield put({type: SIGN_IN_SUCCEEDED, user});
  } catch (e) {
    console.log(e.message);
    yield put({type: SIGN_IN_FAILED});
  }
}

function* authorize() {
  try {
    const user = yield fetch('/api/auth/authorize', {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => res.json());
    yield put({type: AUTHORIZE_SUCCEEDED, user});
  } catch (e) {
    yield put({type: AUTHORIZE_FAILED});
  }
}

export function* authSaga() {
  yield takeEvery(SIGN_UP, signUp);
  yield takeEvery(SIGN_IN, signIn);
  yield takeEvery(AUTHORIZE, authorize);
}
