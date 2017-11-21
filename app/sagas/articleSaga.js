import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../actions/types';
import actions from '../actions/creators';
import {authSaga} from './authSaga';

function * addArticle(api, articleData) {
  const response = yield call(authSaga, api.addArticle, articleData);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    yield put(actions.addArticleSuccess());
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(actions.addArticleFailure(statusCode, errors, message));
  }
}

export function * watchAddArticle(api) {
  while (true) {
    const {data} = yield take(types.ADD_ARTICLE);
    yield call(addArticle, api, data);
  }
}
