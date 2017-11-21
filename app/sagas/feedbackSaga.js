import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../actions/types';
import actions from '../actions/creators';
import {authSaga} from './authSaga';

function * addFeedback(api, feedbackData) {
  const response = yield call(authSaga, api.addFeedback, feedbackData);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(actions.addFeedbackSuccess());
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(actions.addFeedbackFailure(statusCode, errors, message));
  }
}

export function * watchAddFeedback(api) {
  while (true) {
    const {data} = yield take(types.ADD_FEEDBACK);
    yield call(addFeedback, api, data);
  }
}
