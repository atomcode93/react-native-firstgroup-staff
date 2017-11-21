import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, TouchableHighlight, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
import {get, toUpper, includes} from 'lodash';
import Fabric from 'react-native-fabric';
import {Actions as NavActions} from 'react-native-router-flux';
import MainToolbar from '../components/MainToolbar';
import ListItem from '../components/ListItem';
import i18n from '../i18n/i18n.js';
import actions from '../actions/creators';
import {colors, metrics} from '../themes';
import styles from './styles/profileScreenStyle';

const {Answers} = Fabric;

class ProfileScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.title = i18n.t('profile-title');
  }

  componentDidMount() {
    Answers.logContentView('Profile view', 'Screen view', 'profile');
  }

  fetchData = () => {
    const {dispatch} = this.props;
    dispatch(actions.getProfile());
  }

  handlePressLogout = () => {
    const {dispatch} = this.props;
    dispatch(actions.logout());
  }

  handlePressEditProfileName = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfileName({profile, onDone: this.fetchData}));
  }

  handlePressEditPhone = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfilePhone({profile, onDone: this.fetchData}));
  }

  handlePressEditProfileEmployeeId = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.modifyProfileEmployeeId({profile, onDone: this.fetchData}));
  }

  handlePressResetPassword = () => {
    const {profile} = this.props;
    InteractionManager.runAfterInteractions(() => NavActions.resetPassword());
  }

  /* 'Helpful links' section */
  handlePressPerkspotLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.perkspotInfo());
  }

  handlePressAdpLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.adpInfo());
  }

  handlePressWellsFargoLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.wellsfargoInfo());
  }

  handlePressGreatwestlifeLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.greatwestlifeInfo());
  }

  handlePressAmployeeassistanceLink = () => {
    InteractionManager.runAfterInteractions(() => NavActions.employeeAssistanceInfo());
  }

  renderProfileContainer() {
    const {profile} = this.props;
    const email = get(profile, 'email');
    const phone = get(profile, 'phone');
    const name = `${get(profile, 'first_name', '')} ${get(profile, 'last_name', '')}`;
    const employeeId = get(profile, 'employee_id');
    const employeeLocation = get(profile, 'employee_details.location.city');
    const employeeRegion = get(profile, 'employee_details.location.region.name');

    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{i18n.t('profile-userProfile')}</Text>
        </View>
        <ListItem label={i18n.t('profile-name')} value={name} chevron={true} onPress={this.handlePressEditProfileName} />
        <ListItem label={i18n.t('profile-phone')} value={phone} chevron={true} onPress={this.handlePressEditPhone} />
        <ListItem label={i18n.t('profile-email')} value={email} />
        <ListItem label={i18n.t('profile-employeeId')} value={employeeId} chevron={true} onPress={this.handlePressEditProfileEmployeeId} />
        <ListItem label={i18n.t('profile-employeeLocation')} value={employeeLocation} chevron={false} />
        <ListItem label={i18n.t('profile-employeeRegion')} value={employeeRegion} chevron={false} />
        <ListItem label={i18n.t('profile-resetPassword')} chevron={true} onPress={this.handlePressResetPassword} />
      </View>
    );
  }

  renderEmployeeAdminLinks() {
    const {profile} = this.props;
    const countryCode = toUpper(get(profile, 'employee_details.location.region.country_code'))
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{i18n.t('profile-employeeAdmin')}</Text>
        </View>
        <ListItem label={i18n.t('perkspot-link')} chevron={true} onPress={this.handlePressPerkspotLink} />
        {countryCode === 'US' && (
          <View>
            <ListItem label={i18n.t('adp-link')} chevron={true} onPress={this.handlePressAdpLink} />
            <ListItem label={i18n.t('wellsfargo-link')} chevron={true} onPress={this.handlePressWellsFargoLink} />
          </View>
        )}
        {countryCode === 'CA' && (
          <View>
            <ListItem label={i18n.t('greatwestlife-link')} chevron={true} onPress={this.handlePressGreatwestlifeLink} />
            <ListItem label={i18n.t('employeeassistance-link')} chevron={true} onPress={this.handlePressAmployeeassistanceLink} />
          </View>
        )}
      </View>
    );
  }

  renderLogoutButton() {
    return (
      <TouchableHighlight style={styles.logoutButtonContainer} onPress={this.handlePressLogout} underlayColor={colors.lightGrey}>
        <Text style={styles.logoutButtonText}>{i18n.t('profile-logOut')}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <MainToolbar title={this.title} />
        <ScrollView
          contentContainerStyle={{paddingBottom: metrics.scrollViewPaddingBottom}}
          style={styles.scrollView}
        >
          {this.renderProfileContainer()}
          {/*this.renderEmployeeAdminLinks()*/}
          {this.renderLogoutButton()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData
  }
};

export default connect(mapStateToProps)(ProfileScreen);
