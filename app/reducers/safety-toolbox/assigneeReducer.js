import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = {
  assigneesData: [],
  assigneesFetching: false,
  assigneesError: null,
  assigneeData: {},
  assigneeFetching: false,
  assigneeError: null,
  assigneeIndex: 0
};

const getAssigneesRequest = (state, action) => {
  return {
    ...state,
    assigneesFetching: true
  }
}

const getAssigneesSuccess = (state, action) => {
  return {
    ...state,
    assigneesFetching: false,
    assigneesError: null,
    assigneesData: action.assignees
  }
}
  
const getAssigneesFailure = (state, action) => {
  return {
    ...state,
    assigneesFetching: false,
    assigneesError: true,
    assigneesData: []
  }
}
  
const getAssigneeRequest = (state, action) => {
  return {
    ...state,
    assigneeFetching: true
  }
}

const getAssigneeSuccess = (state, action) => {
  return {
    ...state,
    assigneeFetching: false,
    assigneeError: null,
    assigneeData: action.assignee,
    assigneeIndex: action.index
  }
}
  
const getAssigneeFailure = (state, action) => {
  return {
    ...state,
    assigneeFetching: false,
    assigneeError: true,
    assigneeData: {}
  }
}

const ACTION_HANDLERS = {
  [types.GET_ASSIGNEES]: getAssigneesRequest,
  [types.GET_ASSIGNEES_SUCCESS]: getAssigneesSuccess,
  [types.GET_ASSIGNEES_FAILURE]: getAssigneesFailure,
  [types.GET_ASSIGNEE]: getAssigneeRequest,
  [types.GET_ASSIGNEE_SUCCESS]: getAssigneeSuccess,
  [types.GET_ASSIGNEE_FAILURE]: getAssigneeFailure
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
