import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import {authSaga} from './authSaga';
import types from '../actions/types';
import actions from '../actions/creators';

function * registerPush(api, pushId) {
  const response = yield call(authSaga, api.registerPush, pushId);
  const data = get(response, 'data');
  const message = get(data, 'message');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(actions.registerPushSuccess(message));
  } else {
    yield put(actions.registerPushFailure(statusCode, message));
  }
}

export function * watchRegisterPush(api) {
  while (true) {
    const {pushId} = yield take(types.REGISTER_PUSH);
    yield call(registerPush, api, pushId);
  }
}
