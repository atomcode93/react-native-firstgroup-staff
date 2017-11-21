import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getSubmitters(api, submitterFilter) {
  const response = yield call(authSaga, api.getSubmitters, submitterFilter);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const submitters = get(data, 'result');
    yield put(actions.getSubmittersSuccess(submitters));
  } else {
    yield put(actions.getSubmittersFailure(statusCode));
  }
}

function * getSubmitter(api, submitter_id) {
  const response = yield call(authSaga, api.getSubmitter, submitter_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const submitter = get(data, 'result');
    yield put(actions.getSubmitterSuccess(submitter));
  } else {
    yield put(actions.getSubmitterFailure(statusCode));
  }
}

export function * watchGetSubmitters(api) {
  while (true) {
    const {submitterFilter} = yield take(types.GET_SUBMITTERS);
    yield call(getSubmitters, api, submitterFilter);
  }
}

export function * watchGetSubmitter(api) {
  while (true) {
    const {submitter_id} = yield take(types.GET_SUBMITTER);
    yield call(getSubmitter, api, submitter_id);
  }
}

