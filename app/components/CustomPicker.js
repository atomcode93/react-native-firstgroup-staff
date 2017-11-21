import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/customPickerStyle';

export default class CustomPicker extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  static defaultProps = {
    error: null
  }

  render() {
    let {value, placeholder, icon, onPress, error} = this.props;

    let backgroundColor = colors.grey;
    let iconColor = colors.darkGrey;
    let borderColor = colors.grey;
    if (error) {
      backgroundColor = colors.red;
      iconColor = colors.white;
      borderColor = colors.red;
    }

    let pickerContainerStyle = StyleSheet.flatten([styles.pickerContainer, {borderColor}]);
    let pickerImageContainerStyle = StyleSheet.flatten([styles.pickerImageContainer, {backgroundColor}]);

    let selectedValue = value || placeholder;

    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <View style={pickerContainerStyle}>
            {icon && (
              <View style={pickerImageContainerStyle}>
                <Icon name={icon} size={20} color={iconColor}/>
              </View>
            )}
            <View style={styles.pickerTextContainer}>
              <Text style={styles.pickerText} numberOfLines={1}>{selectedValue}</Text>
            </View>
            <View style={styles.pickerArrowContainer}>
              <Icon name="caret-down" size={22} color={colors.darkGrey}/>
            </View>
          </View>
        </TouchableOpacity>
        {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
      </View>
    )
  }
}
