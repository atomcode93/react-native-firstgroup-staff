import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {isEmpty, values, forIn, camelCase} from 'lodash';
import types from '../actions/types';

export const INITIAL_STATE = immutable({
  articleAddSubmitting: false,
  articleAddErrorCode: null,
  articleAddErrors: null,
  articleAddErrorMessage: null
});

const addArticleRequest = (state, action) =>
  state.merge({
    articleAddSubmitting: true,
    articleAddErrorCode: null,
    articleAddErrors: null,
    articleAddErrorMessage: null
  });

const addArticleSuccess = (state, action) =>
  state.merge({
    articleAddSubmitting: false,
    articleAddErrorCode: null,
    articleAddErrors: null,
    articleAddErrorMessage: null,
  });

const addArticleFailure = (state, action) => {
  let camelCasedErrors = {};
  forIn(action.data.errors, (value, key) => camelCasedErrors[camelCase(key)] = value);

  return state.merge({
    articleAddSubmitting: false,
    articleAddErrors: !isEmpty(camelCasedErrors) ? camelCasedErrors : null,
    articleAddErrorCode: action.data.errorCode,
    articleAddErrorMessage: !isEmpty(action.data.errors) ? values(action.data.errors).join('. ') : action.data.message,
  });
};

const logout = (state, action) => INITIAL_STATE;

const ACTION_HANDLERS = {
  [types.ADD_ARTICLE]: addArticleRequest,
  [types.ADD_ARTICLE_SUCCESS]: addArticleSuccess,
  [types.ADD_ARTICLE_FAILURE]: addArticleFailure,
  [types.LOGOUT]: logout
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
