import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = immutable({
  submittersData: [],
  submittersFetching: false,
  submittersError: null,
  submitterData: {},
  submitterFetching: false,
  submitterError: null,
});

const getSubmittersRequest = (state, action) =>
  state.merge({
    submittersFetching: true
  });

const getSubmittersSuccess = (state, action) =>
  state.merge({
    submittersFetching: false,
    submittersError: null,
    submittersData: action.submitters
  });

const getSubmittersFailure = (state, action) =>
  state.merge({
    submittersFetching: false,
    submittersError: true,
    submittersData: {}
  });

const getSubmitterRequest = (state, action) =>
  state.merge({
    submitterFetching: true
});

const getSubmitterSuccess = (state, action) =>
  state.merge({
    submitterFetching: false,
    submitterError: null,
    submitterData: action.submitter
  });

const getSubmitterFailure = (state, action) =>
  state.merge({
    submitterFetching: false,
    submitterError: true,
    submitterData: {}
});

const getSubmitterFailure = (state, action) =>
  state.merge({
    submitterData: {}
});

const ACTION_HANDLERS = {
  [types.GET_SUBMITTERS]: getSubmittersRequest,
  [types.GET_SUBMITTERS_SUCCESS]: getSubmittersSuccess,
  [types.GET_SUBMITTERS_FAILURE]: getSubmittersFailure,
  [types.GET_SUBMITTER]: getSubmitterRequest,
  [types.GET_SUBMITTER_SUCCESS]: getSubmitterSuccess,
  [types.GET_SUBMITTER_FAILURE]: getSubmitterFailure,
  [types.RESET_SUBMITTER]: resetSubmitter,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
