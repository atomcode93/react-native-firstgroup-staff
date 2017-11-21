import {combineReducers} from 'redux';
import initializeReducer from './initializeReducer';
import appStateReducer from './appStateReducer';
import loginReducer from './loginReducer';
import loginPersistentReducer from './loginPersistentReducer';
import registerReducer from './registerReducer';
import profileReducer from './profileReducer';
import sceneReducer from './sceneReducer';
import passwordReducer from './passwordReducer';
import oneSignalReducer from './oneSignalReducer';
import pushReducer from './pushReducer';
import feedbackReducer from './feedbackReducer';
import articleReducer from './articleReducer';
import submitterReducer from './safety-toolbox/submitterReducer'
import locationReducer from './safety-toolbox/locationReducer'
import refNumberReducer from './safety-toolbox/refNumberReducer'
import categoryReducer from './safety-toolbox/categoryReducer'
import contactpersonReducer from './safety-toolbox/contactpersonReducer'
import assigneeReducer from './safety-toolbox/assigneeReducer'
import behaviourReducer from './safety-toolbox/behaviourReducer'
import createcontactReducer from './safety-toolbox/createcontactReducer'

export default combineReducers({
  initialize: initializeReducer,
  appState: appStateReducer,
  login: loginReducer,
  loginPersistent: loginPersistentReducer,
  register: registerReducer,
  profile: profileReducer,
  scene: sceneReducer,
  password: passwordReducer,
  oneSignal: oneSignalReducer,
  push: pushReducer,
  feedback: feedbackReducer,
  article: articleReducer,
  submitter: submitterReducer,
  location: locationReducer,
  refnumber: refNumberReducer,
  category: categoryReducer,
  contactperson: contactpersonReducer,
  assignee: assigneeReducer,
  behaviour: behaviourReducer,
  createcontact: createcontactReducer
});
