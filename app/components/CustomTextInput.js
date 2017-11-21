import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text, findNodeHandle} from 'react-native';
import {get} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/customTextInputStyle';

class CustomTextInput extends Component {
  static propTypes = {
    textInput: PropTypes.object.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    styleEditable: PropTypes.bool
  };

  static defaultProps = {
    error: null,
    styleEditable: false
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  getNodeHandle() {
    return findNodeHandle(this.refs.input);
  }

  render() {
    const {textInput, icon, error, styleEditable} = this.props;
    const {focused} = this.state;
    const editable = get(textInput, 'editable', true);

    let backgroundColor = colors.grey;
    let iconColor = colors.darkGrey;
    let borderColor = colors.grey;
    let inputBackgroundColor = styleEditable && !editable ? colors.lightGrey : colors.white;

    if (error) {
      backgroundColor = colors.red;
      iconColor = colors.white;
      borderColor = colors.red;
    } else if (focused) {
      backgroundColor = colors.darkBlue;
      iconColor = colors.white;
      borderColor = colors.darkBlue;
    }

    textInputContainerStyle = StyleSheet.flatten([styles.textInputContainer, {borderColor, backgroundColor: inputBackgroundColor}]);
    textInputImageContainerStyle = StyleSheet.flatten([styles.textInputImageContainer, {backgroundColor}]);

    const textInputProps = {
      style: StyleSheet.flatten([styles.textInput, {paddingLeft: icon ? 60 : 15}]),
      keyboardType: 'default',
      underlineColorAndroid: 'transparent',
      autoCapitalize: 'none',
      autoCorrect: false,
      ref: 'input',
      placeholderTextColor: colors.darkerGrey,
      editable,
      ...textInput
    };

    return (
      <View>
        <View style={textInputContainerStyle}>
          {icon && (
            <View style={textInputImageContainerStyle}>
              <Icon name={icon} size={20} color={iconColor}/>
            </View>
          )}
          <TextInput
            {...textInputProps}
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})}
          />
        </View>
        {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
      </View>
    )
  }
}

export default CustomTextInput;
