import {take, put, call} from 'redux-saga/effects';
import {get} from 'lodash';
import types from '../../actions/types';
import actions from '../../actions/creators';
import {authSaga} from '../authSaga';

function * getLocations(api, locationFilter) {
  const response = yield call(authSaga, api.getLocations, locationFilter);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const locations = get(data, 'result');
    yield put(actions.getLocationsSuccess(locations));
  } else {
    yield put(actions.getLocationsFailure(statusCode));
  }
}

function * getLocation(api, location_id) {
  const response = yield call(authSaga, api.getLocation, location_id);
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const location = get(data, 'result');
    yield put(actions.getLocationSuccess(location));
  } else {
    yield put(actions.getLocationFailure(statusCode));
  }
}

export function * watchGetLocations(api) {
  while (true) {
    const {locationFilter} = yield take(types.GET_LOCATIONS);
    yield call(getLocations, api, locationFilter);
  }
}

export function * watchGetLocation(api) {
  while (true) {
    const {location_id} = yield take(types.GET_LOCATION);
    yield call(getLocation, api, location_id);
  }
}
