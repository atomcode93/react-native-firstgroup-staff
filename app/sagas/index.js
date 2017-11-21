import {fork} from 'redux-saga/effects';
import apiService from '../services/api';
import {watchInitialize} from './initializeSaga';
import {watchOneSignalEvents} from './oneSignalSaga';
import {watchRegisterPush} from './pushSaga';
import {watchGetToken, watchLogout, watchLogin, watchFbLogin, watchGoogleLoginSetup, watchGoogleLogin} from './authSaga';
import {watchRegister} from './registerSaga';
import {watchGetProfile, watchUpdateProfile} from './profileSaga';
import {watchResetPassword} from './passwordSaga';
import {watchAddFeedback} from './feedbackSaga';
import {watchAddArticle} from './articleSaga';
import {watchAddContact} from './safety-toolbox/createcontactSaga';
import {watchGetSubmitters} from './safety-toolbox/submitterSaga';
import {watchGetSubmitter} from './safety-toolbox/submitterSaga';
import {watchGetRefNumber} from './safety-toolbox/refNumberSaga';
import {watchGetLocations} from './safety-toolbox/locationSaga';
import {watchGetLocation} from './safety-toolbox/locationSaga';
import {watchGetCategories} from './safety-toolbox/categorySaga';
import {watchGetContactPersons} from './safety-toolbox/contactpersonSaga';
import {watchGetContactPerson} from './safety-toolbox/contactpersonSaga';
import {watchGetAssignees} from './safety-toolbox/assigneeSaga';
import {watchGetAssignee} from './safety-toolbox/assigneeSaga';
import {watchGetBehaviours} from './safety-toolbox/behaviourSaga';

const api = apiService.create();

export default function * root() {
  yield fork(watchInitialize)
  yield fork(watchOneSignalEvents)
  yield fork(watchRegister.bind(null, api))
  yield fork(watchRegisterPush.bind(null, api))
  yield fork(watchLogin.bind(null, api))
  yield fork(watchFbLogin.bind(null, api))
  yield fork(watchGoogleLogin.bind(null, api))
  yield fork(watchGoogleLoginSetup)
  yield fork(watchLogout)
  yield fork(watchGetToken.bind(null, api))
  yield fork(watchGetProfile.bind(null, api))
  yield fork(watchUpdateProfile.bind(null, api))
  yield fork(watchResetPassword.bind(null, api))
  yield fork(watchAddFeedback.bind(null, api))
  yield fork(watchAddArticle.bind(null, api))
  yield fork(watchAddContact.bind(null, api))
  yield fork(watchGetSubmitters.bind(null, api))
  yield fork(watchGetSubmitter.bind(null, api))
  yield fork(watchGetRefNumber.bind(null, api))
  yield fork(watchGetLocations.bind(null, api))
  yield fork(watchGetLocation.bind(null, api))
  yield fork(watchGetCategories.bind(null, api))
  yield fork(watchGetContactPersons.bind(null, api))
  yield fork(watchGetContactPerson.bind(null, api))
  yield fork(watchGetAssignees.bind(null, api))
  yield fork(watchGetAssignee.bind(null, api))
  yield fork(watchGetBehaviours.bind(null, api))
}
