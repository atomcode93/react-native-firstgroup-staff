import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getRefNumber(api) {
  const response = yield call(authSaga, api.getRefNumber);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const refNumber = get(data, 'result');
    yield put(actions.getRefNumberSuccess(refNumber));
  } else {
    yield put(actions.getRefNumberFailure(statusCode));
  }
}

export function * watchGetRefNumber(api) {
  while (true) {
    yield take(types.GET_REFNUMBER);
    yield call(getRefNumber, api);
  }
}

