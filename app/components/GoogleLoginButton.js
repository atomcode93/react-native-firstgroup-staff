import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../i18n/i18n.js';
import {colors} from '../themes';
import styles from './styles/googleLoginButtonStyle';

class GoogleLoginButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    const {onPress} = this.props;
    const label = i18n.t('googleLoginButton-label');

    return (
      <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
        <Icon name="google-plus-square" size={24} color={colors.white}/>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

export default GoogleLoginButton;
