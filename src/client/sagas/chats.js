import { put, takeEvery } from 'redux-saga/effects';
import {
  CREATE_CHAT,
  CREATE_CHAT_SUCCEEDED,
  CREATE_CHAT_FAILED,
  GET_CHATS,
  GET_CHATS_SUCCEEDED,
  GET_CHATS_FAILED,
} from '../reducers/chats';

function* create({ credentials }) {
  try {
    const chats = yield fetch('/api/chats/create', {
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
    yield put({type: CREATE_CHAT_SUCCEEDED, chats});
  } catch (e) {
    console.log(e.message);
    yield put({type: CREATE_CHAT_FAILED});
  }
}


function* getChats({ credentials }) {
  try {
    
    const chats = yield fetch('/api/chats/get', {
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

    yield put({type: GET_CHATS_SUCCEEDED, chats});
  } catch (e) {
    console.log(e.message);
    yield put({type: GET_CHATS_FAILED});
  }
}

function* chatsSaga() {
  yield takeEvery(CREATE_CHAT, create);
  yield takeEvery(GET_CHATS, getChats);
}

export default chatsSaga;
