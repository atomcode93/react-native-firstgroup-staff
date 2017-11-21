import {get} from 'lodash';
import types from '../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = immutable({
  pushId: null
});

const oneSignalIdsAvailable = (state, action) =>
  state.merge({
    pushId: get(action, 'ids.userId'),
  });

const logout = (state, action) => immutable({
    ...INITIAL_STATE,
    pushId: state.pushId
});

const ACTION_HANDLERS = {
  [types.ONE_SIGNAL_IDS_AVAILABLE]: oneSignalIdsAvailable,
  [types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
