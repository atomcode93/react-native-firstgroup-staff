import {Alert} from 'react-native';
import {take, call, put} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import OneSignal from 'react-native-onesignal';
import actions from '../actions/creators';
import {get} from 'lodash';

function createOneSignalChannel() {
  return eventChannel(emit => {
    const onIds = data => emit({type: 'ids', data});

    OneSignal.addEventListener('ids', onIds);

    OneSignal.configure();

    return () => {
      OneSignal.removeEventListener('ids', onIds);
    }
  })
}

export function * watchOneSignalEvents() {
  const oneSignalChannel = yield call(createOneSignalChannel);
  while (true) {
    const payload = yield take(oneSignalChannel);

    switch (payload.type) {
      case 'ids':
        yield put(actions.oneSignalIdsAvailable(payload.data));
        break;
    }
  }
}

