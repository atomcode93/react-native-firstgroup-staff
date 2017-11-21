import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getCategories(api) {
  const response = yield call(authSaga, api.getCategories);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const categories = get(data, 'result');
    yield put(actions.getCategoriesSuccess(categories));
  } else {
    yield put(actions.getCategoriesFailure(statusCode));
  }
}

export function * watchGetCategories(api) {
  while (true) {
    yield take(types.GET_CATEGORIES);
    yield call(getCategories, api);
  }
}

