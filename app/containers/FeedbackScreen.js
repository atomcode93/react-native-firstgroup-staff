import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, TouchableHighlight, TouchableOpacity, ListView, Keyboard, LayoutAnimation, StyleSheet, Linking} from 'react-native';
import {connect} from 'react-redux';
import validator from 'validator';
import {get, min} from 'lodash';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {Actions as NavActions} from 'react-native-router-flux';
import Fabric from 'react-native-fabric';
import Modal from 'react-native-modalbox';
import MainToolbar from '../components/MainToolbar';
import CustomTextArea from '../components/CustomTextArea';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
import i18n from '../i18n/i18n.js';
import actions from '../actions/creators';
import {metrics, colors} from '../themes';
import {validate} from '../utils/validationUtils';
import styles from './styles/modifyScreenStyle';

const {Answers} = Fabric;

class FeedbackScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    feedbackAddSubmitting: PropTypes.bool,
    feedbackAddErrors: PropTypes.object,
    feedbackAddErrorCode: PropTypes.number,
    feedbackAddErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      category: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        return null;
      },
      message: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        const maxLength = 1000;
        if (!validator.isLength(value, {max: maxLength})) {
          return i18n.t('validation-stringMaxLength').replace('{0}', maxLength);
        }
        return null;
      }
    };

    const rowHasChanged = (r1, r2) => r1.value !== r2.value;
    this.ds = new ListView.DataSource({rowHasChanged});

    this.state = {
      form: {
        category: null,
        message: null
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight(),
      categoryDataSource: this.ds.cloneWithRows([
        {value: 'App Improvements', label: i18n.t('feedbackCategoryModal-appImprovements')},
        {value: 'Operational Improvements', label: i18n.t('feedbackCategoryModal-operationalImprovements')}
      ])
    };

    this.categoryModal = null;

    this.title = i18n.t('feedback-title');
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidMount() {
    Answers.logContentView('Feedback view', 'Screen view', 'feedback');
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      feedbackAddSubmitting, feedbackAddErrors, feedbackAddErrorMessage, feedbackAddErrorCode,
    } = nextProps;
    const {
      feedbackAddSubmitting: oldFeedbackAddSubmitting
    } = this.props;
    const {dropdownAlert, confirmationDialog} = this.context;

    if (oldFeedbackAddSubmitting && !feedbackAddSubmitting) {
      const errorMessage = feedbackAddErrorMessage || feedbackAddErrorCode;
      if (feedbackAddErrors) {
        this.setState({formErrors: feedbackAddErrors});
      } else if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      } else {
        this.formReset();
        confirmationDialog.show(i18n.t('feedback-feedbackSent'));
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

  formReset = () => {
    this.setState({
      form: {
        message: '',
        category: ''
      },
      formErrors: null
    });
  }

  handlePressAddFeedback = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch} = this.props;
      const {message, category} = form;
      dispatch(actions.addFeedback({message, category}));
    }
  }

  handlePressCategoryPicker = () => {
    if (this.state.categoryDataSource.getRowCount()) {
      this.categoryModal.open();
    }
  }

  handlePressCategorySelect = (category) => {
    const {form} = this.state;
    this.setState({form: {...form, category: category.value}});
    this.categoryModal.close();
  }

  handlePressHotline = () => {
    const url = i18n.t('feedback-infoHotlineLinkUrl');
    Linking.openURL(url);
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {message} = this.refs;
      const inputs = [message.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  getScrollViewHeight = () => {
    return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight - metrics.tabBarHeight;
  }

  render() {
    const {form, formErrors} = this.state;
    const {feedbackAddSubmitting} = this.props;

    const categoryModalStyle = StyleSheet.flatten([styles.modal, {height: min([this.state.categoryDataSource.getRowCount() * 50 + 30, 200])}]);

    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={this.title} />
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight, marginBottom: metrics.tabBarHeight}]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{i18n.t('feedback-info')}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputsWrapper}>
              <CustomPicker
                error={get(formErrors, 'category')}
                placeholder={i18n.t('placeholder-feedbackCategory')}
                value={form.category}
                onPress={this.handlePressCategoryPicker}
              />
              <CustomTextArea
                ref="message"
                error={get(formErrors, 'message')}
                textInput={{
                  placeholder: i18n.t('placeholder-feedbackText'),
                  numberOfLines: 6,
                  multiline: true,
                  value: form.message,
                  autoCapitalize: 'sentences',
                  onChangeText: message => this.setState({form: {...form, message}}),
                  editable: !feedbackAddSubmitting
                }}
              />
            </View>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{i18n.t('feedback-infoImprovementOnly')}</Text>
            <TouchableOpacity style={styles.linkWrapper} onPress={this.handlePressHotline}>
              <Text style={styles.link}>{i18n.t('feedback-infoHotlineLinkText')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton onPress={this.handlePressAddFeedback} label={i18n.t('feedback-button')} showSpinner={feedbackAddSubmitting}/>
          </View>
        </ScrollView>
        <Modal style={categoryModalStyle} position="center" ref={modal => {this.categoryModal = modal}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{i18n.t('feedbackCategoryModal-header')}</Text>
          </View>
          <ListView
            dataSource={this.state.categoryDataSource}
            renderRow={category => {
              return (
                <TouchableHighlight
                  underlayColor={colors.lightGrey}
                  onPress={() => this.handlePressCategorySelect(category)}>
                  <View style={styles.modalListRow}>
                    <Text style={styles.modalListRowText}>{category.label}</Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    feedbackAddSubmitting: state.feedback.feedbackAddSubmitting,
    feedbackAddErrorCode: state.feedback.feedbackAddErrorCode,
    feedbackAddErrors: state.feedback.feedbackAddErrors,
    feedbackAddErrorMessage: state.feedback.feedbackAddErrorMessage
  }
};

export default connect(mapStateToProps)(FeedbackScreen);
