import {take, put, call, select, all} from 'redux-saga/effects';
import {get, includes} from 'lodash';
import types from '../actions/types';
import actions from '../actions/creators';
import {getFbAccessToken, getFbUserData, fbLogout} from '../services/fbService';
import {googleSigninSetup, getGoogleUserData, googleLogout} from '../services/googleService';

function * getToken(api, email, loginToken) {
  const response = yield call(api.getToken, email, loginToken);
  const problem = get(response, 'problem');
  const data = get(response, 'data');
  const statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const authToken = get(data, 'auth_token');
    yield put(actions.getTokenSuccess(email, authToken));
    return authToken;
  } else {
    yield put(actions.getTokenFailure(statusCode, problem));
    return null;
  }
}

function * apiCall(apiFn, apiParams = {}) {
  const authToken = yield select((state) => state.login.authToken);
  return yield call(apiFn, authToken, apiParams);
}

export function * authSaga(apiFn, apiParams = {}) {
  let response = yield call(apiCall, apiFn, apiParams);
  const statusCode = get(response, 'data.response.code');
  if (statusCode === 401) {
    const {email, loginToken} = yield select((state) => state.loginPersistent);
    if (email && loginToken) {
      yield put(actions.getToken(email, loginToken));
      const tokenAction = yield take([types.GET_TOKEN_SUCCESS, types.GET_TOKEN_FAILURE]);
      if (tokenAction.type === types.GET_TOKEN_SUCCESS) {
        response = yield call(apiCall, apiFn, apiParams);
      } else if (tokenAction.type === types.GET_TOKEN_FAILURE) {
        yield put(actions.logout());
      }
    } else {
      yield put(actions.logout());
    }
  }
  return response;
}

function* signIn(api, {email, password}) {
  const response = yield call(api.signIn, email, password);
  const problem = get(response, 'problem');
  const data = get(response, 'data');
  let statusCode = get(data, 'response.code');
  if (statusCode === 200) {
    const loginToken = get(data, 'login_token');
    yield put(actions.getToken(email, loginToken));
    const tokenAction = yield take([types.GET_TOKEN_SUCCESS, types.GET_TOKEN_FAILURE]);
    if (tokenAction.type === types.GET_TOKEN_SUCCESS) {
      yield put(actions.loginSuccess(email, loginToken));
    } else if (tokenAction.type === types.GET_TOKEN_FAILURE) {
      statusCode = yield select((state) => state.login.tokenErrorCode);
      yield put(actions.loginFailure(statusCode));
    }
  } else {
    const errors = get(data, 'errors');
    const message = get(data, 'message');
    yield put(actions.loginFailure(statusCode, errors, message, problem));
  }
}

function* fbSignIn(api) {
  try {
    const fbAccessToken = yield call(getFbAccessToken);
    if (fbAccessToken) {
      const fbUserData = yield call(getFbUserData);
      const {id, email, first_name, last_name} = fbUserData;
      const response = yield call(api.fbSignIn, id, fbAccessToken, first_name, last_name, email);
      const problem = get(response, 'problem');
      const data = get(response, 'data');
      let statusCode = get(data, 'response.code');
      if (statusCode === 200) {
        const loginToken = get(data, 'login_token');
        yield put(actions.getToken(email, loginToken));
        const tokenAction = yield take([types.GET_TOKEN_SUCCESS, types.GET_TOKEN_FAILURE]);
        if (tokenAction.type === types.GET_TOKEN_SUCCESS) {
          yield put(actions.fbLoginSuccess(email, loginToken));
        } else if (tokenAction.type === types.GET_TOKEN_FAILURE) {
          statusCode = yield select((state) => state.login.tokenErrorCode);
          yield put(actions.fbLoginFailure(statusCode));
        }
      } else {
        const errors = get(data, 'errors');
        const message = get(data, 'message');
        yield put(actions.fbLoginFailure(statusCode, errors, message, problem));
      }
    }
  }
  catch(error) {
    yield put(actions.fbLoginFailure(null, null, get(error, 'message')));
  }
}

function* googleSignIn(api) {
  try {
    const googleUserData = yield call(getGoogleUserData);
    const {id, idToken, accessToken, serverAuthCode, givenName, familyName, name, email, photo} = googleUserData;
    const response = yield call(api.googleSignIn, id, idToken, accessToken, serverAuthCode, givenName, familyName, name, email, photo);
    const problem = get(response, 'problem');
    const data = get(response, 'data');
    let statusCode = get(data, 'response.code');
    if (statusCode === 200) {
      const loginToken = get(data, 'login_token');
      yield put(actions.getToken(email, loginToken));
      const tokenAction = yield take([types.GET_TOKEN_SUCCESS, types.GET_TOKEN_FAILURE]);
      if (tokenAction.type === types.GET_TOKEN_SUCCESS) {
        yield put(actions.googleLoginSuccess(email, loginToken));
      } else if (tokenAction.type === types.GET_TOKEN_FAILURE) {
        statusCode = yield select((state) => state.login.tokenErrorCode);
        yield put(actions.googleLoginFailure(statusCode));
      }
    } else {
      const errors = get(data, 'errors');
      const message = get(data, 'message');
      yield put(actions.googleLoginFailure(statusCode, errors, message, problem));
    }
  }
  catch(error) {
    const errorCode = get(error, 'code');
    if (includes([-5, 12501], errorCode)) {
      yield put(actions.googleLoginCancel());
    } else {
      yield put(actions.googleLoginFailure(errorCode, null, get(error, 'message')));
    }
  }
}

function* googleSignInSetup() {
  try {
    yield call(googleSigninSetup);
    yield put(actions.googleLoginSetupSuccess());
  }
  catch(error) {
    yield put(actions.googleLoginSetupFailure(get(error, 'code'), null, get(error, 'message')));
  }
}

function* logout() {
  yield all([
    call(fbLogout),
    call(googleLogout)
  ]);
}

export function * watchGetToken(api) {
  while (true) {
    const {email, loginToken} = yield take(types.GET_TOKEN);
    yield call(getToken, api, email, loginToken);
  }
}

export function * watchLogout() {
  while (true) {
    yield take(types.LOGOUT);
    yield call(logout);
  }
}

export function* watchLogin(api) {
  while (true) {
    const {data} = yield take(types.LOGIN);
    yield call(signIn, api, data);
  }
}

export function* watchFbLogin(api) {
  while (true) {
    yield take(types.FB_LOGIN);
    yield call(fbSignIn, api);
  }
}

export function* watchGoogleLoginSetup() {
  while (true) {
    yield take(types.GOOGLE_LOGIN_SETUP);
    yield call(googleSignInSetup);
  }
}

export function* watchGoogleLogin(api) {
  while (true) {
    yield take(types.GOOGLE_LOGIN);
    yield call(googleSignIn, api);
  }
}
