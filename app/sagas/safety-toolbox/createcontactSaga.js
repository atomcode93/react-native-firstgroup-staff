import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * addContact(api, contactData) {
  const response = yield call(authSaga, api.addContact, contactData);
  const data = get(response, 'data');
  console.log("data is:", data);
  
  const statusCode = get(data, 'response.code');
  console.log("statuscode is:", statusCode);
  if (statusCode === 200) {
    yield put(actions.addContactSuccess());
  } else {
    const message = get(data, 'message');
    const errors = get(data, 'errors');
    yield put(actions.addContactFailure(statusCode, errors, message));
  }
}

export function * watchAddContact(api) {
  while (true) {
    const {data} = yield take(types.ADD_CONTACT);
    yield call(addContact, api, data);
  }
}
