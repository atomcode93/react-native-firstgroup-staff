import types from '../../actions/types';
import immutable from 'seamless-immutable';
import {createReducer} from 'reduxsauce';
import {values} from 'lodash';

export const INITIAL_STATE = {
  behavioursData: [],
  behavioursFetching: false,
  behavioursError: null,
  behaviourData: '',
  behaviourIndex: 0
};

const getBehaviour= (state, action) => {

  return {
    ...state,
    behaviourData: action.behaviour,
    behaviourIndex: action.index
  }

}

const getBehavioursRequest = (state, action) => {
  return {
    ...state,
    behavioursFetching: true
  }
}

const getBehavioursSuccess = (state, action) => {
  return {
    ...state,
    behavioursFetching: false,
    behavioursError: null,
    behavioursData: action.behaviours
  }
}
  
const getBehavioursFailure = (state, action) => {
  return {
    ...state,
    behavioursFetching: false,
    behavioursError: true,
    behavioursData: []
  }
}
  
const ACTION_HANDLERS = {
  [types.GET_BEHAVIOUR]: getBehaviour,
  [types.GET_BEHAVIOURS]: getBehavioursRequest,
  [types.GET_BEHAVIOURS_SUCCESS]: getBehavioursSuccess,
  [types.GET_BEHAVIOURS_FAILURE]: getBehavioursFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
