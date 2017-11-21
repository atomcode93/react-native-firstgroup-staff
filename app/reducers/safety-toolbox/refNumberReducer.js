import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = immutable({
  refNumberData: '',
  refNumberFetching: false,
  refNumberError: null
});

const getRefNumberRequest = (state, action) =>
  state.merge({
    refNumberFetching: true
  });

const getRefNumberSuccess = (state, action) =>
  state.merge({
    refNumberFetching: false,
    refNumberError: null,
    refNumberData: action.refNumber
  });

const getRefNumberFailure = (state, action) =>
  state.merge({
    refNumberFetching: false,
    refNumberError: true,
    refNumberData: ''
  });

const ACTION_HANDLERS = {
  [types.GET_REFNUMBER]: getRefNumberRequest,
  [types.GET_REFNUMBER_SUCCESS]: getRefNumberSuccess,
  [types.GET_REFNUMBER_FAILURE]: getRefNumberFailure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
