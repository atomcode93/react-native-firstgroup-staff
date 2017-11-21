import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text, Keyboard, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {Actions as NavActions} from 'react-native-router-flux';
import Fabric from 'react-native-fabric';
import MainToolbar from '../components/MainToolbar';
import ListItem from '../components/ListItem';
import CustomTextArea from '../components/CustomTextArea';
import CustomTextInput from '../components/CustomTextInput';
import CustomSwitch from '../components/CustomSwitch';
import CustomButton from '../components/CustomButton';
import i18n from '../i18n/i18n.js';
import actions from '../actions/creators';
import {validate} from '../utils/validationUtils';
import {metrics} from '../themes';
import styles from './styles/publishScreenStyle';

const {Answers} = Fabric;

class PublishScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    articleAddSubmitting: PropTypes.bool,
    articleAddErrors: PropTypes.object,
    articleAddErrorCode: PropTypes.number,
    articleAddErrorMessage: PropTypes.string
  };

  static contextTypes = {
    dropdownAlert: PropTypes.object,
    confirmationDialog: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.formConstraints = {
      title: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        return null;
      },
      fullArticle: (value) => {
        if (!value) {
          return i18n.t('validation-presence');
        }
        return null;
      }
    };

    this.state = {
      form: {
        title: '',
        fullArticle: '',
        notifyUsers: false,
      },
      formErrors: null,
      visibleHeight: this.getScrollViewHeight()
    };

    this.title = i18n.t('publish-title');
  }

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidMount() {
    Answers.logContentView('Publish view', 'Screen view', 'publish');
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      articleAddSubmitting, articleAddErrors, articleAddErrorMessage, articleAddErrorCode,
    } = nextProps;
    const {
      articleAddSubmitting: oldArticleAddSubmitting
    } = this.props;
    const {dropdownAlert, confirmationDialog} = this.context;

    if (oldArticleAddSubmitting && !articleAddSubmitting) {
      const errorMessage = articleAddErrorMessage || articleAddErrorCode;
      if (articleAddErrors) {
        this.setState({formErrors: articleAddErrors});
      } else if (errorMessage) {
        dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
      } else {
        this.formReset();
        confirmationDialog.show(i18n.t('publish-articleSent'));
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
        title: '',
        fullArticle: '',
        notifyUsers: false,
      },
      formErrors: null
    });
  }

  handlePressPublish = () => {
    const {form} = this.state;
    const formErrors = validate(form, this.formConstraints);
    this.setState({formErrors});
    if (!formErrors) {
      const {dispatch} = this.props;
      const {title, fullArticle, notifyUsers} = form;
      dispatch(actions.addArticle({title, fullArticle, notifyUsers}));
    }
  }

  handleCapture = (e) => {
    const focusField = TextInputState.currentlyFocusedField();
    const target = e.nativeEvent.target;
    if (focusField != null && target != focusField) {
      const {title, fullArticle} = this.refs;
      const inputs = [title.getNodeHandle(), fullArticle.getNodeHandle()];
      if (inputs && inputs.indexOf(target) === -1) {
        dismissKeyboard();
      }
    }
  }

  getScrollViewHeight = () => {
    return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight - metrics.tabBarHeight;
  }

  renderProfileContainer() {
    const {profile} = this.props;
    const employeeLocation = get(profile, 'employee_details.location.city');
    const employeeRegion = get(profile, 'employee_details.location.region.name');

    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{i18n.t('publish-publishingInstructions')}</Text>
        </View>
        <ListItem label={i18n.t('profile-employeeLocation')} value={employeeLocation} chevron={false} />
        <ListItem label={i18n.t('profile-employeeRegion')} value={employeeRegion} chevron={false} />
      </View>
    );
  }

  renderPublishForm() {
    const {form, formErrors} = this.state;
    const {articleAddSubmitting} = this.props;

    return (
      <View style={styles.publishFormContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{i18n.t('publish-info')}</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputsWrapper}>
            <CustomTextInput ref="title" error={get(formErrors, 'title')} textInput={{
              value: form.title,
              autoCapitalize: 'sentences',
              placeholder: i18n.t('placeholder-articleTitle'),
              onChangeText: title => this.setState({form: {...form, title}}),
              editable: !articleAddSubmitting
            }}/>
            <CustomTextArea
              ref="fullArticle"
              error={get(formErrors, 'fullArticle')}
              textInput={{
                value: form.fullArticle,
                autoCapitalize: 'sentences',
                placeholder: i18n.t('placeholder-articleText'),
                numberOfLines: 8,
                multiline: true,
                onChangeText: fullArticle => this.setState({form: {...form, fullArticle}}),
                editable: !articleAddSubmitting
              }}
            />
            <CustomSwitch ref="notifyUsers" error={get(formErrors, 'notifyUsers')}
              label={i18n.t('publish-notifyUsers')}
              switchProps={{
                value: form.notifyUsers,
                onValueChange: notifyUsers => this.setState({form: {...form, notifyUsers}}),
                disabled: articleAddSubmitting
            }}/>
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <CustomButton onPress={this.handlePressPublish} label={i18n.t('publish-button')} disabled={true}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
        <MainToolbar title={this.title} />
        <ScrollView
          contentContainerStyle={{paddingBottom: metrics.scrollViewPaddingBottom}}
          style={[styles.scrollView, {height: this.state.visibleHeight}]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          {this.renderProfileContainer()}
          {this.renderPublishForm()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData,
    articleAddSubmitting: state.article.articleAddSubmitting,
    articleAddErrorCode: state.article.articleAddErrorCode,
    articleAddErrors: state.article.articleAddErrors,
    articleAddErrorMessage: state.article.articleAddErrorMessage
  }
};

export default connect(mapStateToProps)(PublishScreen);
