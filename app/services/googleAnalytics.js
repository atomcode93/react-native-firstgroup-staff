import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import env from '../core/env';

let tracker;
let trackerMobile;

export default function configureAnalytics(analyticsTrackerId = env.app.google.analyticsTrackerId, analyticsTrackerMobileId = env.app.google.analyticsTrackerMobileId) {
  if (analyticsTrackerId) {
    tracker = new GoogleAnalyticsTracker(analyticsTrackerId);
  }
  if (analyticsTrackerMobileId) {
    trackerMobile = new GoogleAnalyticsTracker(analyticsTrackerMobileId);
  }
}

export const trackScreenView = screenName => {
  if (tracker) {
    tracker.trackScreenView(screenName);
  }
  if (trackerMobile) {
    trackerMobile.trackScreenView(screenName);
  }
}


