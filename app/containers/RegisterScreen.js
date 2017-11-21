import React, {Component, findNodeHandle} from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, ScrollView, Text, Image, TouchableOpacity, TouchableHighlight, Keyboard, LayoutAnimation, ListView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {get, map, split, trim} from 'lodash';
import actions from '../actions/creators';
import {images, metrics, colors} from '../themes';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import FbLoginButton from '../components/FbLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import i18n from '../i18n/i18n.js';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import {validate} from '../utils/validationUtils';
import {trackScreenView} from '../services/googleAnalytics';
import styles from './styles/registerScreenStyle';

class RegisterScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fbLoginSubmitting: PropTypes.bool,
    fbLoginErrorCode: PropTypes.number,
    fbLoginErrorMessage: PropTypes.string,
    fbLoginProblem: PropTypes.string,
    googleLoginSetupReady: PropTypes.bool,
    googleLoginSubmitting: PropTypes.bool,
    googleLoginErrorCode: PropTypes.number,
    googleLoginErrorMessage: PropTypes.string,
    googleLoginProblem: PropTypes.string,
    registrationSubmitting: PropTypes.bool,
    registrationErrors: PropTypes.object,
    registrationErrorCode: PropTypes.number,
    registrationErrorMessage: PropTypes.string,
    registrationSuccessMessage: PropTypes.string,
    tokenProblem: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      firstName: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        const minLength = 2;
        if (!validator.isLength(value, {min: minLength})) {
          return i18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      },
      lastName: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        const minLength = 2;
        if (!validator.isLength(value, {min: minLength})) {
          return i18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      },
      email: (value, form) => {
        const phone = form.phone || '';
        const isPhoneValid = validator.isNumeric(phone);
        if (isPhoneValid && !value) {
          return null;
        }
        if (!value) {
          return i18n.t('validation-presence');
        }
        if (!validator.isEmail(value.trim())) {
          return i18n.t('validation-email');
        }
        return null;
      },
      employeeId: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        const minLength = 5;
        if (!validator.isLength(value, {min: minLength})) {
          return i18n.t('validation-stringMinLength').replace('{0}', minLength);
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        return null;
      },
      passwordConfirmation: (value, form) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        if (value !== form.password) {
          return i18n.t('validation-passwordMatch');
        }
        return null;
      }
    };

    this.state = {
      form: {
        firstName: null,
        lastName: null,
        email: null,
        employeeId: null,
        password: null,
        passwordConfirmation: null
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight(),
    };

    this.title = i18n.t('register-title');
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
    const {
      dispatch,
      registrationSubmitting, registrationErrors, registrationErrorMessage, registrationErrorCode, registrationSuccessMessage,
      fbLoginSubmitting, fbLoginErrorMessage, fbLoginErrorCode,
      googleLoginSubmitting, googleLoginErrorMessage, googleLoginErrorCode
    } = nextProps;
    const {
      registrationSubmitting: oldRegistrationSubmitting,
      fbLoginSubmitting: oldFbLoginSubmitting,
      googleLoginSubmitting: oldGoogleLoginSubmitting
    } = this.props;
    const {dropdownAlert, confirmationDialog} = this.context;

    if (oldRegistrationSubmitting && !registrationSubmitting) {
      const errorMessage = registrationErrorMessage || registrationErrorCode;
      if (registrationErrors) {
        this.setState({formErrors: registrationErrors});
      } else if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      } else if (registrationSuccessMessage) {
        NavActions.login({type: NavActionConst.REPLACE});
        confirmationDialog.show(registrationSuccessMessage);
        dispatch(actions.clearRegistrationSuccessMessage());
      }
    }

    if (oldFbLoginSubmitting && !fbLoginSubmitting) {
      const errorMessage = fbLoginErrorMessage || fbLoginErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      }
    }

    if (oldGoogleLoginSubmitting && !googleLoginSubmitting) {
      const errorMessage = googleLoginErrorMessage || googleLoginErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
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
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: this.getScrollViewHeight()
    });
  }

  handlePressRegister = () => {
    const {registrationSubmitting} = this.props;
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors && !registrationSubmitting) {
      const {dispatch} = this.props;
      const {firstName, lastName, email, employeeId, password, passwordConfirmation} = form;
      dispatch(actions.register({firstName, lastName, email, employeeId, password, passwordConfirmation}));
    }
  }

  handlePressLogin = () => {
    NavActions.login({type: NavActionConst.REPLACE});
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {firstName, lastName, email, employeeId, password, passwordConfirmation} = this.refs;
      const inputs = [firstName.getNodeHandle(), lastName.getNodeHandle(), email.getNodeHandle(), employeeId.getNodeHandle(), password.getNodeHandle(), passwordConfirmation.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  handleFbLogin = () => {
    const {dispatch, fbLoginSubmitting} = this.props;
    if (!fbLoginSubmitting) {
      dispatch(actions.fbLogin());
    }
  }

  handleGoogleLogin = () => {
    const {dispatch, googleLoginSubmitting} = this.props;
    if (!googleLoginSubmitting) {
      dispatch(actions.googleLogin());
    }
  }

  renderNetworkErrorInfo = () => {
    const {loginProblem, fbLoginProblem, googleLoginProblem, tokenProblem} = this.props;
    if (
      loginProblem === 'NETWORK_ERROR' ||
      fbLoginProblem === 'NETWORK_ERROR' ||
      googleLoginProblem === 'NETWORK_ERROR' ||
      tokenProblem === 'NETWORK_ERROR'
    ) {
      return (
        <View style={styles.networkErrorInfoContainer}>
          <View style={styles.networkErrorInfoWrapper}>
            {map(split(i18n.t('error-networkLine'), '<br>'), (item, index) => <Text key={index} style={styles.networkErrorInfoText}>{trim(item)}</Text>)}
          </View>
        </View>
      );
    }
  }

  getScrollViewHeight = () => {
    return metrics.screenHeight - metrics.firstviewBannerHeight - metrics.statusBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {registrationSubmitting, googleLoginSetupReady} = this.props;

    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <StatusBar barStyle='default' backgroundColor={colors.darkGrey}/>
        <View style={styles.firstviewHeader}>
          <Image source={images.firstviewBanner} style={styles.firstviewHeaderImage}/>
        </View>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{this.title}</Text>
          </View>
          {this.renderNetworkErrorInfo()}
          <FbLoginButton onPress={this.handleFbLogin} />
          {googleLoginSetupReady && <GoogleLoginButton onPress={this.handleGoogleLogin} />}
          <View>
            <Text style={styles.infoText}>{i18n.t('register-info')}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="firstName" icon="user" error={get(formErrors, 'firstName')} textInput={{
                  autoCapitalize: 'words',
                  placeholder: i18n.t('placeholder-firstName'),
                  onChangeText: firstName => this.setState({form: {...form, firstName}}),
                  editable: !registrationSubmitting
              }}/>
              <CustomTextInput ref="lastName" icon="user" error={get(formErrors, 'lastName')} textInput={{
                  autoCapitalize: 'words',
                  placeholder: i18n.t('placeholder-lastName'),
                  onChangeText: lastName => this.setState({form: {...form, lastName}}),
                  editable: !registrationSubmitting
              }}/>
              <CustomTextInput ref="email" icon="envelope" error={get(formErrors, 'email')} textInput={{
                  keyboardType: 'email-address',
                  placeholder: i18n.t('placeholder-email'),
                  onChangeText: email => this.setState({form: {...form, email}}),
                  editable: !registrationSubmitting
              }}/>
              <CustomTextInput ref="employeeId" icon="user" error={get(formErrors, 'employeeId')} textInput={{
                  placeholder: i18n.t('placeholder-employeeId'),
                  onChangeText: employeeId => this.setState({form: {...form, employeeId}}),
                  editable: !registrationSubmitting
              }}/>
              <CustomTextInput ref="password" icon="key" error={get(formErrors, 'password')} textInput={{
                  placeholder: i18n.t('placeholder-choosePassword'),
                  onChangeText: password => this.setState({form: {...form, password}}),
                  editable: !registrationSubmitting,
                  secureTextEntry: true
              }}/>
              <CustomTextInput ref="passwordConfirmation" icon="key" error={get(formErrors, 'passwordConfirmation')} textInput={{
                  placeholder: i18n.t('placeholder-confirmPassword'),
                  onChangeText: passwordConfirmation => this.setState({form: {...form, passwordConfirmation}}),
                  editable: !registrationSubmitting,
                  secureTextEntry: true
              }}/>
            </View>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton onPress={this.handlePressRegister} label={i18n.t('register-submitButton')} showSpinner={registrationSubmitting}/>
          </View>
          <View style={styles.loginLinkContainer}>
            <Text>{i18n.t('register-alreadyAnUser')}</Text>
            <TouchableOpacity style={styles.loginLinkWrapper} onPress={this.handlePressLogin}>
              <Text style={styles.loginLink}>{i18n.t('register-loginLink')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fbLoginSubmitting: state.login.fbLoginSubmitting,
    fbLoginErrorCode: state.login.fbLoginErrorCode,
    fbLoginErrorMessage: state.login.fbLoginErrorMessage,
    fbLoginProblem: state.login.fbLoginProblem,
    googleLoginSetupReady: state.login.googleLoginSetupReady,
    googleLoginSubmitting: state.login.googleLoginSubmitting,
    googleLoginErrorCode: state.login.googleLoginErrorCode,
    googleLoginErrorMessage: state.login.googleLoginErrorMessage,
    googleLoginProblem: state.login.googleLoginProblem,
    registrationSubmitting: state.register.registrationSubmitting,
    registrationErrorCode: state.register.registrationErrorCode,
    registrationErrors: state.register.registrationErrors,
    registrationErrorMessage: state.register.registrationErrorMessage,
    registrationSuccessMessage: state.register.registrationSuccessMessage,
    tokenProblem: state.login.tokenProblem
  };
};

export default connect(mapStateToProps)(RegisterScreen);
