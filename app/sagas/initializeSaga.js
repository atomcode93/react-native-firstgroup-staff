import {take, put, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import types from '../actions/types';
import actions from '../actions/creators';

export function * watchInitialize() {
  yield take(types.INITIALIZE);
  yield put(actions.googleLoginSetup());
  const {email, loginToken} = yield select(state => state.loginPersistent);
  if (email && loginToken) {
    yield put(actions.getToken(email, loginToken));
    const tokenAction = yield take([types.GET_TOKEN_SUCCESS, types.GET_TOKEN_FAILURE]);
    yield put(actions.initializeSuccess());
  } else {
    yield put(actions.initializeSuccess());
  }
}
