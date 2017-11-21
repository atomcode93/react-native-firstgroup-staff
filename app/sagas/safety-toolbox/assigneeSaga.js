import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getAssignees(api, assigneeFilter) {
  const response = yield call(authSaga, api.getSubmitters, assigneeFilter);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const assignees = get(data, 'result');
    yield put(actions.getAssigneesSuccess(assignees));
  } else {
    yield put(actions.getAssigneesFailure(statusCode));
  }
}

function * getAssignee(api, user_id, index) {
  const response = yield call(authSaga, api.getSubmitter, user_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const assignee = get(data, 'result');
    yield put(actions.getAssigneeSuccess(assignee, index));
  } else {
    yield put(actions.getAssigneeFailure(statusCode));
  }
}

export function * watchGetAssignees(api) {
  while (true) {
    const {assigneeFilter} = yield take(types.GET_ASSIGNEES);
    yield call(getAssignees, api, assigneeFilter);
  }
}

export function * watchGetAssignee(api) {
  while (true) {
    const {user_id, index} = yield take(types.GET_ASSIGNEE);
    yield call(getAssignee, api, user_id, index);
  }
}
