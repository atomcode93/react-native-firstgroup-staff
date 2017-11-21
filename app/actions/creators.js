import types from './types';

const initialize = () => ({type: types.INITIALIZE});
const initializeSuccess = () => ({type: types.INITIALIZE_SUCCESS});

const register = (registrationData) => ({type: types.REGISTER, registrationData});
const registerSuccess = (message) => ({type: types.REGISTER_SUCCESS, message});
const registerFailure = (errorCode, errors, message) => ({type: types.REGISTER_FAILURE, errorCode, errors, message});
const clearRegistrationSuccessMessage = () => ({type: types.CLEAR_REGISTRATION_SUCCESS_MESSAGE});

const login = (email, password) => ({type: types.LOGIN, data: {email, password}});
const loginSuccess = (email, loginToken) => ({type: types.LOGIN_SUCCESS, data: {email, loginToken}});
const loginFailure = (errorCode, errors, message, problem) => ({type: types.LOGIN_FAILURE, data: {errorCode, errors, message, problem}});

const fbLogin = () => ({type: types.FB_LOGIN});
const fbLoginSuccess = (email, loginToken) => ({type: types.FB_LOGIN_SUCCESS, data: {email, loginToken}});
const fbLoginFailure = (errorCode, errors, message, problem) => ({type: types.FB_LOGIN_FAILURE, data: {errorCode, errors, message, problem}});

const googleLogin = () => ({type: types.GOOGLE_LOGIN});
const googleLoginSuccess = (email, loginToken) => ({type: types.GOOGLE_LOGIN_SUCCESS, data: {email, loginToken}});
const googleLoginFailure = (errorCode, errors, message, problem) => ({type: types.GOOGLE_LOGIN_FAILURE, data: {errorCode, errors, message, problem}});
const googleLoginCancel = () => ({type: types.GOOGLE_LOGIN_CANCEL});

const googleLoginSetup = () => ({type: types.GOOGLE_LOGIN_SETUP});
const googleLoginSetupSuccess = () => ({type: types.GOOGLE_LOGIN_SETUP_SUCCESS});
const googleLoginSetupFailure = (errorCode, errors, message) => ({type: types.GOOGLE_LOGIN_SETUP_FAILURE, data: {errorCode, errors, message}});

const getToken = (email, loginToken) => ({type: types.GET_TOKEN, email, loginToken});
const getTokenSuccess = (email, authToken) => ({type: types.GET_TOKEN_SUCCESS, email, authToken});
const getTokenFailure = (errorCode, problem) => ({type: types.GET_TOKEN_FAILURE, errorCode, problem});

const logout = () => ({type: types.LOGOUT});

const getProfile = () => ({type: types.GET_PROFILE});
const getProfileSuccess = (profile) => ({type: types.GET_PROFILE_SUCCESS, profile});
const getProfileFailure = (errorCode) => ({type: types.GET_PROFILE_FAILURE, errorCode});

const resetPassword = (email) => ({type: types.RESET_PASSWORD, email});
const resetPasswordSuccess = () => ({type: types.RESET_PASSWORD_SUCCESS});
const resetPasswordFailure = (errorCode, errors, message) => ({type: types.RESET_PASSWORD_FAILURE, errorCode, errors, message});

const registerPush = (pushId) => ({type: types.REGISTER_PUSH, pushId});
const registerPushSuccess = () => ({type: types.REGISTER_PUSH_SUCCESS});
const registerPushFailure = (errorCode, message) => ({type: types.REGISTER_PUSH_FAILURE, errorCode, message});

const oneSignalIdsAvailable = (ids) => ({type: types.ONE_SIGNAL_IDS_AVAILABLE, ids});

const updateProfile = (profileData) => ({type: types.UPDATE_PROFILE, profileData});
const updateProfileSuccess = (profileData) => ({type: types.UPDATE_PROFILE_SUCCESS, profileData});
const updateProfileFailure = (errorCode, errors, message) => ({type: types.UPDATE_PROFILE_FAILURE, errorCode, errors, message});

const selectBehaviour = (selection, index) => ({type: types.SELECT_BEHAVIOUR, selection, index})

const addFeedback = (feedbackData) => ({type: types.ADD_FEEDBACK, data: feedbackData});
const addFeedbackSuccess = () => ({type: types.ADD_FEEDBACK_SUCCESS});
const addFeedbackFailure = (errorCode, errors, message) => ({type: types.ADD_FEEDBACK_FAILURE, data: {errorCode, errors, message}});

const addArticle = (articleData) => ({type: types.ADD_ARTICLE, data: articleData});
const addArticleSuccess = () => ({type: types.ADD_ARTICLE_SUCCESS});
const addArticleFailure = (errorCode, errors, message) => ({type: types.ADD_ARTICLE_FAILURE, data: {errorCode, errors, message}});

const addContact = (contactData) => ({type: types.ADD_CONTACT, data: contactData});
const addContactSuccess = () => ({type: types.ADD_CONTACT_SUCCESS});
const addContactFailure = (errorCode, errors, message) => ({type: types.ADD_CONTACT_FAILURE, data: {errorCode, errors, message}});

const getSubmitters = (submitterFilter) => ({type: types.GET_SUBMITTERS, submitterFilter});
const getSubmittersSuccess = (submitters) => ({type: types.GET_SUBMITTERS_SUCCESS, submitters});
const getSubmittersFailure = (errorCode) => ({type: types.GET_SUBMITTERS_FAILURE, errorCode});
const getSubmitter = (submitter_id) => ({type: types.GET_SUBMITTER, submitter_id})
const getSubmitterSuccess = (submitter) => ({type: types.GET_SUBMITTER_SUCCESS, submitter})
const getSubmitterFailure = (errorCode) => ({type: types.GET_SUBMITTER_FAILURE, errorCode});
const getRefNumber = () => ({type: types.GET_REFNUMBER});
const getRefNumberSuccess = (refNumber) => ({type: types.GET_REFNUMBER_SUCCESS, refNumber});
const getRefNumberFailure = (errorCode) => ({type: types.GET_REFNUMBER_FAILURE, errorCode});
const getLocations = (locationFilter) => ({type: types.GET_LOCATIONS, locationFilter});
const getLocationsSuccess = (locations) => ({type: types.GET_LOCATIONS_SUCCESS, locations});
const getLocationsFailure = (errorCode) => ({type: types.GET_LOCATIONS_FAILURE, errorCode});
const getLocation = (location_id) => ({type: types.GET_LOCATION, location_id});
const getLocationSuccess = (location) => ({type: types.GET_LOCATION_SUCCESS, location});
const getLocationFailure = (errorCode) => ({type: types.GET_LOCATION_FAILURE, errorCode});
const getCategories = () => ({type: types.GET_CATEGORIES});
const getCategory = (category) => ({type: types.GET_CATEGORY, category});
const getCategoriesSuccess = (categories) => ({type: types.GET_CATEGORIES_SUCCESS, categories});
const getCategoriesFailure = (errorCode) => ({type: types.GET_CATEGORIES_FAILURE, errorCode});
const getContactPersons = (location_id) => ({type: types.GET_CONTACTPERSONS, location_id});
const getContactPersonsSuccess = (contactPersons) => ({type: types.GET_CONTACTPERSONS_SUCCESS, contactPersons});
const getContactPersonsFailure = (errorCode) => ({type: types.GET_CONTACTPERSONS_FAILURE, errorCode});
const getContactPerson = (user_id) => ({type: types.GET_CONTACTPERSON, user_id});
const getContactPersonSuccess = (contactPerson) => ({type: types.GET_CONTACTPERSON_SUCCESS, contactPerson});
const getContactPersonFailure = (errorCode) => ({type: types.GET_CONTACTPERSON_FAILURE, errorCode});
const getAssignees = (assigneeFilter) => ({type: types.GET_ASSIGNEES, assigneeFilter});
const getAssigneesSuccess = (assignees) => ({type: types.GET_ASSIGNEES_SUCCESS, assignees});
const getAssigneesFailure = (errorCode) => ({type: types.GET_ASSIGNEES_FAILURE, errorCode});
const getAssignee = (user_id, index) => ({type: types.GET_ASSIGNEE, user_id, index});
const getAssigneeSuccess = (assignee, index) => ({type: types.GET_ASSIGNEE_SUCCESS, assignee, index});
const getAssigneeFailure = (errorCode) => ({type: types.GET_ASSIGNEE_FAILURE, errorCode});
const getBehaviours = (division_id) => ({type: types.GET_BEHAVIOURS, division_id});
const getBehavioursSuccess = (behaviours) => ({type: types.GET_BEHAVIOURS_SUCCESS, behaviours});
const getBehavioursFailure = (errorCode) => ({type: types.GET_BEHAVIOURS_FAILURE, errorCode});
const getBehaviour = (behaviour, index) => ({type: types.GET_BEHAVIOUR, behaviour, index});

const resetSubmitter = () => ({type: types.RESET_SUBMITTER});
const resetLocation = () => ({type: types.RESET_LOCATION});
const resetContactPerson = () => ({type: types.RESET_CONTACTPERSON});
const resetCategory = () => ({type: types.RESET_CATEGORY});

export default {
  initialize,
  initializeSuccess,
  register,
  registerSuccess,
  registerFailure,
  clearRegistrationSuccessMessage,
  login,
  loginSuccess,
  loginFailure,
  fbLogin,
  fbLoginSuccess,
  fbLoginFailure,
  googleLoginSetup,
  googleLoginSetupSuccess,
  googleLoginSetupFailure,
  googleLogin,
  googleLoginSuccess,
  googleLoginFailure,
  googleLoginCancel,
  getToken,
  getTokenSuccess,
  getTokenFailure,
  logout,
  getProfile,
  getProfileSuccess,
  getProfileFailure,

  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  registerPush,
  registerPushSuccess,
  registerPushFailure,

  selectBehaviour,

  oneSignalIdsAvailable,
  addFeedback,
  addFeedbackSuccess,
  addFeedbackFailure,
  addArticle,
  addArticleSuccess,
  addArticleFailure,
  addContact,
  addContactSuccess,
  addContactFailure,

  /* Safety Toolbox Page actions */
  getSubmitters,
  getSubmittersSuccess,
  getSubmittersFailure,
  getSubmitter,
  getSubmitterSuccess,
  getSubmitterFailure,
  getRefNumber,
  getRefNumberSuccess,
  getRefNumberFailure,

  getLocations,
  getLocationsSuccess,
  getLocationsFailure,
  getLocation,
  getLocationSuccess,
  getLocationFailure,
  getCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategory,
  getContactPersons,
  getContactPersonsSuccess,
  getContactPersonsFailure,
  getContactPerson,
  getContactPersonSuccess,
  getContactPersonFailure,
  getAssignees,
  getAssigneesSuccess,
  getAssigneesFailure,
  getAssignee,
  getAssigneeSuccess,
  getAssigneeFailure,
  getBehaviours,
  getBehavioursSuccess,
  getBehavioursFailure,
  getBehaviour,

  resetSubmitter,
  resetLocation,
  resetContactPerson,
  resetCategory
  /* */

}
