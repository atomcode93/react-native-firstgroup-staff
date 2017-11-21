import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, Navigator, Text} from 'react-native';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {Crashlytics} from 'react-native-fabric';
import {DefaultRenderer} from 'react-native-router-flux';
import {Actions as NavActions} from 'react-native-router-flux';
import {isEqual, isEmpty, get, includes, filter, cloneDeep} from 'lodash';
import actions from '../actions/creators';
import {colors} from '../themes';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SafetyMessageDialog from '../components/SafetyMessageDialog';
import styles from './styles/mainScreenStyle';

class MainScreen extends Component {
  static propTypes = {
    profile: PropTypes.object,
    scene: PropTypes.object,
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func,
    dispatch: PropTypes.func.isRequired
  };

  static childContextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object,
    safetyMessageDialog: PropTypes.object
  };

  getChildContext = () => ({
    dropdownAlert: this.dropdownAlert,
    confirmationDialog: this.confirmationDialog,
    safetyMessageDialog: this.safetyMessageDialog
  });

  componentDidMount() {
    const {dispatch} = this.props;
    this.safetyMessageDialog.open();
  }

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;
    const {profile: oldProfile} = this.props;

    if (!isEmpty(profile) && !isEqual(profile, oldProfile)) {
      this.setCrashlyticsProfile(profile);
    }
  }

  setCrashlyticsProfile = (profile) => {
    const profileFullName = `${get(profile, 'first_name')} ${get(profile, 'last_name')}`;
    const profileEmail = get(profile, 'email', '');
    const profilePhone = get(profile, 'phone', '');
    const profileId = get(profile, 'id', '');

    Crashlytics.setUserIdentifier(profileEmail);
    Crashlytics.setUserName(profileFullName);
    Crashlytics.setString('fullName', profileFullName);
    Crashlytics.setUserEmail(profileEmail);
    Crashlytics.setString('phone', profilePhone);
  }

  render() {
    const {navigationState, onNavigate, profile, dispatch} = this.props;
    const appScenes = navigationState.children[0];
    return (
      <View style={styles.applicationView}>
        <DropdownAlert ref={(c) => this.dropdownAlert = c} />
        <StatusBar barStyle='default' backgroundColor={colors.darkGrey} />
        <DefaultRenderer navigationState={appScenes} onNavigate={onNavigate} />
        <ConfirmationDialog ref={(c) => this.confirmationDialog = c} />
        <SafetyMessageDialog ref={(c) => this.safetyMessageDialog = c} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData
  }
};

export default connect(mapStateToProps)(MainScreen);
