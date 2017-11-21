import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = immutable({
  locationsData: [],
  locationsFetching: false,
  locationsError: null,
  locationFetching: false,
  locationError: null,
  locationData: {}
});

const getLocationsRequest = (state, action) =>
  state.merge({
    locationsFetching: true
  });

const getLocationsSuccess = (state, action) =>
  state.merge({
    locationsFetching: false,
    locationsError: null,
    locationsData: action.locations
  });

const getLocationsFailure = (state, action) =>
  state.merge({
    locationsFetching: false,
    locationsError: true,
    locationsData: []
  });

const getLocationRequest = (state, action) =>
  state.merge({
    locationFetching: true
  });

const getLocationSuccess = (state, action) =>
  state.merge({
    locationFetching: false,
    locationError: null,
    locationData: action.location
  });

const getLocationFailure = (state, action) =>
  state.merge({
    locationFetching: false,
    locationError: true,
    locationData: {}
});

const resetLocation = () => {
  state.merge({
    locationData: {}
  })
}

const ACTION_HANDLERS = {
  [types.GET_LOCATIONS]: getLocationsRequest,
  [types.GET_LOCATIONS_SUCCESS]: getLocationsSuccess,
  [types.GET_LOCATIONS_FAILURE]: getLocationsFailure,
  [types.GET_LOCATION]: getLocationRequest,
  [types.GET_LOCATION_SUCCESS]: getLocationSuccess,
  [types.GET_LOCATION_FAILURE]: getLocationFailure,
  [types.RESET_LOCATION]: resetLocation,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
