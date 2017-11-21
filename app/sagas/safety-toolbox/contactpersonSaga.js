import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getContactPersons(api, location_id) {
  const response = yield call(authSaga, api.getContactPersons, location_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const contactPersons = get(data, 'result');
    yield put(actions.getContactPersonsSuccess(contactPersons));
  } else {
    yield put(actions.getContactPersonsFailure(statusCode));
  }
}

function * getContactPerson(api, user_id) {
  const response = yield call(authSaga, api.getContactPerson, user_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const contactPerson = get(data, 'result');
    yield put(actions.getContactPersonSuccess(contactPerson));
  } else {
    yield put(actions.getContactPersonFailure(statusCode));
  }
}

export function * watchGetContactPersons(api) {
  while (true) {
    const {location_id} = yield take(types.GET_CONTACTPERSONS);
    yield call(getContactPersons, api, location_id);
  }
}

export function * watchGetContactPerson(api) {
  while (true) {
    const {user_id} = yield take(types.GET_CONTACTPERSON);
    yield call(getContactPerson, api, user_id);
  }
}


