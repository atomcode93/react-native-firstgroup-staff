import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = immutable({
  contactPersonsData: [],
  contactPersonsFetching: false,
  contactPersonsError: null,
  contactPersonData: {},
  contactPersonFetching: false,
  contactPersonError: null,
});

const getContactPersonsRequest = (state, action) =>
  state.merge({
    contactPersonsFetching: true
  });

const getContactPersonsSuccess = (state, action) =>
  state.merge({
    contactPersonsFetching: false,
    contactPersonsError: null,
    contactPersonsData: action.contactPersons
  });

const getContactPersonsFailure = (state, action) =>
  state.merge({
    contactPersonsFetching: false,
    contactPersonsError: true,
    contactPersonsData: []
  });

  const getContactPersonRequest = (state, action) =>
  state.merge({
    contactPersonFetching: true
  });

const getContactPersonSuccess = (state, action) =>
  state.merge({
    contactPersonFetching: false,
    contactPersonError: null,
    contactPersonData: action.contactPerson
  });

const getContactPersonFailure = (state, action) =>
  state.merge({
    contactPersonFetching: false,
    contactPersonError: true,
    contactPersonData: {}
});

const resetContactPerson = () => {
  state.merge({
    contactPersonData: {}
  })
}

const ACTION_HANDLERS = {
  [types.GET_CONTACTPERSONS]: getContactPersonsRequest,
  [types.GET_CONTACTPERSONS_SUCCESS]: getContactPersonsSuccess,
  [types.GET_CONTACTPERSONS_FAILURE]: getContactPersonsFailure,
  [types.GET_CONTACTPERSON]: getContactPersonRequest,
  [types.GET_CONTACTPERSON_SUCCESS]: getContactPersonSuccess,
  [types.GET_CONTACTPERSON_FAILURE]: getContactPersonFailure,
  [types.RESET_CONTACTPERSON]: resetContactPerson
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
