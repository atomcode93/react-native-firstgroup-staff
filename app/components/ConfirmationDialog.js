import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Modal from 'react-native-modalbox';
import {isEmpty} from 'lodash';
import i18n from '../i18n/i18n.js';
import CustomButton from './CustomButton';
import styles from './styles/confirmationDialogStyle';

class ConfirmationDialog extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  };

  state = {
    message: null
  };

  show = (message) => {
    this.setState({message});
  }

  hide = () => {
    this.setState({message: null});
  }

  render() {
    const {message} = this.state;
    return (
      <Modal style={styles.modal} position={'center'} backdropPressToClose={false} swipeToClose={false} isOpen={!isEmpty(message)}>
        <View style={styles.modalMessage}>
          <Text style={styles.modalMessageText}>{message}</Text>
        </View>
        <View style={[styles.buttonContainer]}>
          <CustomButton onPress={this.hide} label={i18n.t('confirmationDialog-ok')}/>
        </View>
      </Modal>
    )
  }
}

export default ConfirmationDialog;
