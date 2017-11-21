import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../actions/types';
import actions from '../actions/creators';

function * register(api, registrationData) {
  const response = yield call(api.register, registrationData);
  const data = get(response, 'data');
  const message = get(data, 'message');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(actions.registerSuccess(message));
  } else {
    const errors = get(data, 'errors');
    yield put(actions.registerFailure(statusCode, errors, message));
  }
}

export function * watchRegister(api) {
  while (true) {
    const {registrationData} = yield take(types.REGISTER);
    yield call(register, api, registrationData);
  }
}
