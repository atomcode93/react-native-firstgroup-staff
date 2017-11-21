import types from '../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = immutable({
  email: null,
  loginToken: null
});

const loginSuccess = (state, action) =>
  state.merge({
    email: action.data.email,
    loginToken: action.data.loginToken
  });

const loginFailure = (state, action) =>
  state.merge({
    email: null,
    loginToken: null
  });

const tokenSuccess = (state, action) =>
  state.merge({
    email: action.email
  });

const tokenFailure = (state, action) =>
  state.merge({
    email: null,
    loginToken: null
  });

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [types.LOGIN_SUCCESS]: loginSuccess,
  [types.LOGIN_FAILURE]: loginFailure,
  [types.FB_LOGIN_SUCCESS]: loginSuccess,
  [types.FB_LOGIN_FAILURE]: loginFailure,
  [types.GOOGLE_LOGIN_SUCCESS]: loginSuccess,
  [types.GOOGLE_LOGIN_FAILURE]: loginFailure,
  [types.GET_TOKEN_SUCCESS]: tokenSuccess,
  [types.GET_TOKEN_FAILURE]: tokenFailure,
  [types.LOGOUT]: logout
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
