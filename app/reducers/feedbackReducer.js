import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {isEmpty, values} from 'lodash';
import types from '../actions/types';

export const INITIAL_STATE = immutable({
  feedbackAddSubmitting: false,
  feedbackAddErrorCode: null,
  feedbackAddErrors: null,
  feedbackAddErrorMessage: null
});

const addFeedbackRequest = (state, action) =>
  state.merge({
    feedbackAddSubmitting: true,
    feedbackAddErrorCode: null,
    feedbackAddErrors: null,
    feedbackAddErrorMessage: null
  });

const addFeedbackSuccess = (state, action) =>
  state.merge({
    feedbackAddSubmitting: false,
    feedbackAddErrorCode: null,
    feedbackAddErrors: null,
    feedbackAddErrorMessage: null
  });

const addFeedbackFailure = (state, action) => {
  let camelCasedErrors = {};
  forIn(action.data.errors, (value, key) => camelCasedErrors[camelCase(key)] = value);

  return state.merge({
    feedbackAddSubmitting: false,
    feedbackAddErrors: !isEmpty(camelCasedErrors) ? camelCasedErrors : null,
    feedbackAddErrorCode: action.data.errorCode,
    feedbackAddErrorMessage: !isEmpty(action.data.errors) ? values(action.data.errors).join('. ') : action.data.message,
  });
};

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [types.ADD_FEEDBACK]: addFeedbackRequest,
  [types.ADD_FEEDBACK_SUCCESS]: addFeedbackSuccess,
  [types.ADD_FEEDBACK_FAILURE]: addFeedbackFailure,
  [types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
