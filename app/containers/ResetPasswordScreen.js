import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text, TouchableOpacity, TouchableHighlight, Keyboard, LayoutAnimation, ListView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {get, map, split, trim} from 'lodash';
import MainToolbar from '../components/MainToolbar';
import i18n from '../i18n/i18n.js';
import actions from '../actions/creators';
import {Images, metrics, colors} from '../themes';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {Actions as NavActions} from 'react-native-router-flux';
import {validate} from '../utils/validationUtils';
import {trackScreenView} from '../services/googleAnalytics';
import styles from './styles/modifyScreenStyle';

class ResetPasswordScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    resetPasswordSubmitting: PropTypes.bool,
    resetPasswordErrorCode: PropTypes.number,
    resetPasswordErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      email: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        if (!validator.isEmail(value.trim())) {
          return i18n.t('validation-email');
        }
        return null;
      }
    };

    this.state = {
      form: {
        email: null
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight()
    };

    this.title = i18n.t('resetPassword-title');
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
    const {resetPasswordSubmitting, resetPasswordErrorMessage, resetPasswordErrorCode, dispatch} = nextProps;
    const {resetPasswordSubmitting: oldResetPasswordSubmitting} = this.props;
    const {dropdownAlert, confirmationDialog} = this.context;

    if (oldResetPasswordSubmitting && !resetPasswordSubmitting) {
      const errorMessage = resetPasswordErrorMessage || resetPasswordErrorCode;
      if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      } else {
        NavActions.pop();
        confirmationDialog.show(i18n.t('resetPassword-successful'));
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

  handlePressResetPassword = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch} = this.props;
      const {email} = form;
      dispatch(actions.resetPassword(email));
    }
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {email} = this.refs;
      const inputs = [email.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  handleBack = () => {
    NavActions.pop();
  }

  getScrollViewHeight = () => {
    return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {resetPasswordSubmitting} = this.props;

    return (
      <View style={[styles.mainContainer]} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={this.title} leftButton={{text: i18n.t('mainToolbar-cancel'), onPress: this.handleBack}}/>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={styles.infoTextContainer}>
            {map(split(i18n.t('resetPassword-info'), '<br>'), (item, index) => <Text key={index} style={styles.infoText}>{trim(item)}</Text>)}
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomTextInput ref="email" icon="envelope" error={get(formErrors, 'email')} textInput={{
                keyboardType: 'email-address',
                placeholder: i18n.t('placeholder-email'),
                onChangeText: email => this.setState({form: {...form, email}}),
                editable: !resetPasswordSubmitting
              }}/>
            </View>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton onPress={this.handlePressResetPassword} label={i18n.t('resetPassword-button')} showSpinner={resetPasswordSubmitting}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resetPasswordSubmitting: state.password.resetPasswordSubmitting,
    resetPasswordErrorCode: state.password.resetPasswordErrorCode,
    resetPasswordErrorMessage: state.password.resetPasswordErrorMessage
  }
};

export default connect(mapStateToProps)(ResetPasswordScreen);
