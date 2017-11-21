import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Switch, StyleSheet, Text} from 'react-native';
import {colors} from '../themes';
import styles from './styles/customSwitchStyle';

class CustomSwitch extends Component {
  static propTypes = {
    switchProps: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string
  };

  static defaultProps = {
    error: null
  };

  render() {
    const {error, label, switchProps} = this.props;

    return (
      <View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{label}</Text>
          <Switch {...switchProps} onTintColor={{colors}.darkGreen} />
        </View>
        {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
      </View>
    )
  }
}

export default CustomSwitch;
