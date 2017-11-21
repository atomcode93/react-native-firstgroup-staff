import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text, Keyboard, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {get} from 'lodash';
import MainToolbar from '../components/MainToolbar';
import i18n from '../i18n/i18n.js';
import actions from '../actions/creators';
import {metrics} from '../themes';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {Actions as NavActions} from 'react-native-router-flux';
import {validate} from '../utils/validationUtils';
import {trackScreenView} from '../services/googleAnalytics';
import styles from './styles/modifyScreenStyle';

class ModifyProfileEmployeeIdScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    onDone: PropTypes.func,
    profileUpdateSubmitting: PropTypes.bool,
    profileUpdateErrorCode: PropTypes.number,
    profileUpdateErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      employeeId: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        const minLength = 5;
        if (!validator.isLength(value, {min: minLength})) {
          return i18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      }
    };

    this.state = {
      form: {
        employeeId: get(props, 'profile.employee_id'),
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight(),
    };

    this.title = i18n.t('modifyProfileEmployeeId-title');
    this.info = i18n.t('modifyProfileEmployeeId-info');
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidMount() {
    trackScreenView(this.title);
  }

  componentWillReceiveProps(nextProps) {
    const {onDone, profileUpdateSubmitting, profileUpdateErrorMessage, profileUpdateErrorCode} = nextProps;
    const {profileUpdateSubmitting: oldProfileUpdateSubmitting} = this.props;

    if (oldProfileUpdateSubmitting && !profileUpdateSubmitting) {
      const errorMessage = profileUpdateErrorMessage || profileUpdateErrorCode;
      if (errorMessage) {
        this.context.dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      } else {
        NavActions.pop();
        onDone && onDone();
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = this.getScrollViewHeight() - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize
    });
  };

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: this.getScrollViewHeight()
    });
  };

  handlePressSubmitProfileEmployeeId = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch, profile: {first_name, last_name, phone}} = this.props;
      const {employeeId} = form;
      dispatch(actions.updateProfile({firstName: first_name, lastName: last_name, employeeId, phone}));
    }
  };

  handleBack = () => {
    NavActions.pop();
  };

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {employeeId} = this.refs;
      const inputs = [employeeId.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  };

  getScrollViewHeight = () => {
    return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {employeeId} = form;
    const {profileUpdateSubmitting: attempting} = this.props;

    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={this.title} leftButton={{text: i18n.t('mainToolbar-cancel'), onPress: this.handleBack}}/>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{this.info}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="employeeId" icon="globe" error={get(formErrors, 'employeeId')} textInput={{
                  placeholder: i18n.t('placeholder-employeeId'),
                  defaultValue: employeeId,
                  onChangeText: employeeId => this.setState({form: {...form, employeeId}}),
                  editable: !attempting
              }}/>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={this.handlePressSubmitProfileEmployeeId} label={i18n.t('modifyProfileEmployeeId-done')} showSpinner={attempting}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileUpdateSubmitting: state.profile.profileUpdateSubmitting,
    profileUpdateErrorCode: state.profile.profileUpdateErrorCode,
    profileUpdateErrorMessage: state.profile.profileUpdateErrorMessage
  }
};

export default connect(mapStateToProps)(ModifyProfileEmployeeIdScreen);
