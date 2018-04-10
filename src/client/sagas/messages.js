import { put, takeEvery } from 'redux-saga/effects';
import {
  GET_MESSAGES,
  GET_MESSAGES_SUCCEEDED,
  GET_MESSAGES_FAILED,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCEEDED,
  SEND_MESSAGE_FAILED,
} from '../reducers/messages';

function* getMessages({ credentials }) {
  try {
    const messages = yield fetch('/api/messages/get', {
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
    yield put({type: GET_MESSAGES_SUCCEEDED, messages});
  } catch (e) {
    console.log(e.message);
    yield put({type: GET_MESSAGES_FAILED});
  }
}


function* sendMessage({ credentials }) {
  try {
    const messages = yield fetch('/api/messages/sendmessage', {
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
    yield put({type: SEND_MESSAGE_SUCCEEDED, messages});
  } catch (e) {
    console.log(e.message);
    yield put({type: SEND_MESSAGE_FAILED});
  }
}

function* messagesSaga() {
  yield takeEvery(GET_MESSAGES, getMessages);
  yield takeEvery(SEND_MESSAGE, sendMessage);
}

export default messagesSaga;
