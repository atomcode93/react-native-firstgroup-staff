import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {isEmpty, values, forIn, camelCase} from 'lodash';
import types from '../../actions/types';

export const INITIAL_STATE = immutable({
  contactAddSubmitting: false,
  contactAddErrorCode: null,
  contactAddErrors: null,
  contactAddErrorMessage: null
});

const addContactRequest = (state, action) =>
  state.merge({
    contactAddSubmitting: true,
    contactAddErrorCode: null,
    contactAddErrors: null,
    contactAddErrorMessage: null
  });

const addContactSuccess = (state, action) =>
  state.merge({
    contactAddSubmitting: false,
    contactAddErrorCode: null,
    contactAddErrors: null,
    contactAddErrorMessage: null,
  });

const addContactFailure = (state, action) => {
  let camelCasedErrors = {};
  forIn(action.data.errors, (value, key) => camelCasedErrors[camelCase(key)] = value);

  return state.merge({
    contactAddSubmitting: false,
    contactAddErrors: !isEmpty(camelCasedErrors) ? camelCasedErrors : null,
    contactAddErrorCode: action.data.errorCode,
    contactAddErrorMessage: !isEmpty(action.data.errors) ? values(action.data.errors).join('. ') : action.data.message,
  });
};

const ACTION_HANDLERS = {
  [types.ADD_CONTACT]: addContactRequest,
  [types.ADD_CONTACT_SUCCESS]: addContactSuccess,
  [types.ADD_CONTACT_FAILURE]: addContactFailure,
  
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
