import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = immutable({
  categoriesData: {},
  categoriesFetching: false,
  categoriesError: null,
  category: ''
});

const getCategory= (state, action) => {
  return {
    ...state,
    category: action.category
  }
}

const getCategoriesRequest = (state, action) =>
  state.merge({
    categoriesFetching: true
  });

const getCategoriesSuccess = (state, action) =>
  state.merge({
    categoriesFetching: false,
    categoriesError: null,
    categoriesData: action.categories
  });

const getCategoriesFailure = (state, action) =>
  state.merge({
    categoriesFetching: false,
    categoriesError: true,
    categoriesData: {}
});

const resetCategory = () => {
  state.merge({
    category: ''
  })
}

const ACTION_HANDLERS = {
  [types.GET_CATEGORY]: getCategory,
  [types.GET_CATEGORIES]: getCategoriesRequest,
  [types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,
  [types.RESET_CATEGORY]: resetCategory,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
