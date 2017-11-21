import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getBehaviours(api, division_id) {
  const response = yield call(authSaga, api.getBehaviours, division_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const behaviours = get(data, 'result');
    yield put(actions.getBehavioursSuccess(behaviours));
  } else {
    yield put(actions.getBehavioursFailure(statusCode));
  }
}

export function * watchGetBehaviours(api) {
  while (true) {
    const {division_id} = yield take(types.GET_BEHAVIOURS);
    yield call(getBehaviours, api, division_id);
  }
}

