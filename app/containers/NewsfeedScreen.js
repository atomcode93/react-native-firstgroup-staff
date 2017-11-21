import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View, WebView, ActivityIndicator, Linking} from 'react-native';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {isNil, includes, get} from 'lodash';
import env from '../core/env';
import i18n from '../i18n/i18n.js';
import MainToolbar from '../components/MainToolbar';
import {colors} from '../themes';
import styles from '../components/styles/webViewStyle';

class NewsfeedScreen extends Component {
  static propTypes = {
    profile: PropTypes.object,
    scene: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.dummy = new Date().getTime();
    this.title = i18n.t('newsfeed-title');
  }

  componentWillReceiveProps(nextProps) {
    const {scene} = nextProps;
    const {scene: oldScene} = this.props;

    const sceneKey = get(scene, 'sceneKey');
    const oldSceneKey = get(oldScene, 'sceneKey');

    if ((sceneKey !== oldSceneKey && includes(['newsfeedEditor_1', 'newsfeedNoEditor_1'], sceneKey)) || sceneKey === 'tabBar') {
      this.dummy = new Date().getTime();
    }
  }

  handlePressWebviewBack = () => {
    this.webView.goBack();
  }

  handleNavigationStateChange = navigationState => {
    if (Platform.OS === 'android') {
      const {url} = navigationState;
      if (/file_attachments|\.(pdf|doc|docx|xls|xlsx|zip)$/.test(url)) {
        Linking.openURL(url);
      }
    }
  }

  render() {
    const {profile: {user_id: userId}} = this.props;
    const uri = encodeURI(isNil(userId) ? `${env.app.links.newsfeedUrl}?dummy=${this.dummy}` : `${env.app.links.newsfeedUrl}?user_id=${userId}&dummy=${this.dummy}`);
  
    return (
      <View style={[styles.mainContainer]}>
        <MainToolbar title={this.title} leftButton={{icon: 'chevron-left', onPress: this.handlePressWebviewBack}} />
          <WebView
            ref={(c) => this.webView = c}
            source={{uri}}
            style={styles.webViewTab}
            startInLoadingState={true}
            renderLoading={() => <View style={styles.loadingView}><ActivityIndicator color={colors.darkBlue} animating={true} size={'large'} /></View>}
            allowsInlineMediaPlayback={true}
            onNavigationStateChange={this.handleNavigationStateChange}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profileData,
    scene: state.scene.sceneData
  }
};

export default connect(mapStateToProps)(NewsfeedScreen);
