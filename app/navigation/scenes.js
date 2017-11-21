import React from 'react';
import {Actions as NavActions, ActionConst as NavActionConst, Scene, Switch} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {get} from 'lodash';

import StartupScreen from '../components/StartupScreen';
import SafetyToolboxScreen from '../containers/safety-toolbox/SafetyToolboxScreen';
import SubmittedbyScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/SubmittedbyScreen';
import LocationScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/LocationScreen';
import CategoryScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/CategoryScreen';
import ContactPersonScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/ContactPersonScreen';
import AssigneeScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/AssigneeScreen';
import BehaviourScreen from '../containers/safety-toolbox/safety-toolbox-form-inputs/BehaviourScreen';
import LoginScreen from '../containers/LoginScreen';
import RegisterScreen from '../containers/RegisterScreen';
import MainScreen from '../containers/MainScreen';
import ProfileScreen from '../containers/ProfileScreen';
import ModifyProfileNameScreen from '../containers/ModifyProfileNameScreen';
import ModifyProfileEmployeeIdScreen from '../containers/ModifyProfileEmployeeIdScreen';
import ModifyProfilePhoneScreen from '../containers/ModifyProfilePhoneScreen';
import NewsfeedScreen from '../containers/NewsfeedScreen';
import PublishScreen from '../containers/PublishScreen';
import FeedbackScreen from '../containers/FeedbackScreen';
import ResetPasswordScreen from '../containers/ResetPasswordScreen';
import PerkspotScreen from '../components/PerkspotScreen';
import AdpScreen from '../components/AdpScreen';
import WellsfargoScreen from '../components/WellsfargoScreen';
import GreatwestlifeScreen from '../components/GreatwestlifeScreen';
import EmployeeAssistanceScreen from '../components/EmployeeAssistanceScreen';
import TabIcon from '../components/TabIcon';
import {trackScreenView} from '../services/googleAnalytics';
import i18n from '../i18n/i18n.js';
import {applicationStyles} from '../themes';

const scenes = NavActions.create(
  <Scene key="root" component={MainScreen} >
    <Scene key="appScenes" hideNavBar={true} hideTabBar={true}>
      <Scene key="startup" initial={true} component={StartupScreen} />

      <Scene key="login" component={LoginScreen} />
      <Scene key="resetPassword" component={ResetPasswordScreen} />
      <Scene key="register" component={RegisterScreen} />

      <Scene key="modifyProfileName" component={ModifyProfileNameScreen} />
      <Scene key="modifyProfileEmployeeId" component={ModifyProfileEmployeeIdScreen} />
      <Scene key="modifyProfilePhone" component={ModifyProfilePhoneScreen} />

      <Scene key="perkspotInfo" component={PerkspotScreen} />
      <Scene key="adpInfo" component={AdpScreen} />
      <Scene key="wellsfargoInfo" component={WellsfargoScreen} />
      <Scene key="greatwestlifeInfo" component={GreatwestlifeScreen} />
      <Scene key="employeeAssistanceInfo" component={EmployeeAssistanceScreen} />
      <Scene key="submittedBy" component={SubmittedbyScreen} hideNavBar={true} />
      <Scene key="location" component={LocationScreen} hideNavBar={true} />
      <Scene key="category" component={CategoryScreen} hideNavBar={true} />
      <Scene key="contactPerson" component={ContactPersonScreen} hideNavBar={true} />
      <Scene key="assignee" component={AssigneeScreen} hideNavBar={true} />
      <Scene key="behaviour" component={BehaviourScreen} hideNavBar={true} />

      <Scene
        key="tabBar"
        tabs={true}
        component={connect(state=>({profile: state.profile.profileData}))(Switch)}
        selector={props => !!get(props, 'profile.employee_id') ? 'editor' : 'noEditor'}
      >
        <Scene key="editor" tabs={true} hideTabBar={false} tabBarStyle={applicationStyles.component.tabBar}>
          <Scene
            key="newsfeedEditor"
            title="Newsfeed"
            icon={TabIcon}
            iconCode="rss"
            onPress={()=> {
              NavActions.newsfeedEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('newsfeed-title'));
            }}
          >
            <Scene key="newsfeedEditor_1" component={NewsfeedScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="publishEditor"
            title="Publish"
            icon={TabIcon}
            iconCode="plus"
            onPress={()=> {
              NavActions.publishEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('publish-title'));
            }}
          >
            <Scene key="publishEditor_1" component={PublishScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="feedbackEditor"
            title="Feedback"
            icon={TabIcon}
            iconCode="comment"
            onPress={()=> {
              NavActions.feedbackEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('feedback-title'));
            }}
          >
            <Scene key="feedbackEditor_1" component={FeedbackScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="createContact"
            title="Contact"
            icon={TabIcon}
            iconCode="warning"
            onPress={()=> {
              NavActions.createContact_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('contact-title'));
            }}
          >
            <Scene key="createContact_1" component={SafetyToolboxScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="profileEditor"
            title="Profile"
            icon={TabIcon}
            iconCode="user"
            onPress={()=> {
              NavActions.profileEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('profile-title'));
            }}
          >
            <Scene key="profileEditor_1" component={ProfileScreen} hideNavBar={true} />
          </Scene>
        </Scene>
        <Scene key="noEditor" tabs={true} hideTabBar={false} tabBarStyle={applicationStyles.component.tabBar}>
          <Scene
            key="newsfeedNoEditor"
            title="Newsfeed"
            icon={TabIcon}
            iconCode="rss"
            onPress={()=> {
              NavActions.newsfeedNoEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('newsfeed-title'));
            }}
          >
            <Scene key="newsfeedNoEditor_1" component={NewsfeedScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="feedbackNoEditor"
            title="Feedback"
            icon={TabIcon}
            iconCode="comment"
            onPress={()=> {
              NavActions.feedbackNoEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('feedback-title'));
            }}
          >
            <Scene key="feedbackNoEditor_1" component={FeedbackScreen} hideNavBar={true} />
          </Scene>
          <Scene
            key="profileNoEditor"
            title="Profile"
            icon={TabIcon}
            iconCode="user"
            onPress={()=> {
              NavActions.profileNoEditor_1({type: NavActionConst.REFRESH});
              trackScreenView(i18n.t('profile-title'));
            }}
          >
            <Scene key="profileNoEditor_1" component={ProfileScreen} hideNavBar={true} />
          </Scene>
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);

export default scenes;
