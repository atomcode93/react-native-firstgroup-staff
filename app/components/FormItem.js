import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import i18n from '../i18n/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/formItemStyle';

class FormItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    chevron: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    chevron: false
  };

  render() {
    
    const {source, label, value, error, radioType, chevron, onPress} = this.props;
    
    let selectedRadio = '';
    let unselectedRadio = ''; 

    if (radioType === 'userRadio') {
      selectedRadio = i18n.t('radio-user');
      unselectedRadio = i18n.t('radio-nonuser')
    }
    if (radioType === 'occuRadio') {
      selectedRadio = i18n.t('radio-onsite');
      unselectedRadio = i18n.t('radio-offsite')
    }
      
    return (
      <TouchableHighlight onPress={onPress} underlayColor={colors.lightGrey}>
        <View style={label === i18n.t('assignee-title') || label === i18n.t('behaviour-title') ? styles.formItemContainer : 
          [styles.formItemContainer, { borderBottomWidth: 1, borderColor: colors.grey}]} >
          <View style={styles.formItemContentContainer}>
            {radioType ? <View style={styles.formItemLabelContainer}>
                            <Text style={styles.formItemLabelText}>{label}</Text>
                          </View> : 
                          <View>
                            <Text style={styles.formItemLabelText}>{label}</Text>
                          </View>
            }
            
            <View style={styles.formItemValueContainer}>
                {value ? <Text style={styles.formItemValueText} numberOfLines={2}>{value}</Text> : <View />}
                {radioType ? <RadioGroup
                                style={styles.radioGroup}
                                color={colors.darkerGrey}
                                selectedIndex={0}
                                onSelect={onPress}>
                                <RadioButton
                                    color='black' 
                                    value={'user'}
                                    style={{height: 20}}>
                                    <Text style={styles.radioText}>{selectedRadio}</Text>
                                </RadioButton>
                                <RadioButton
                                    color='black'
                                    value={'non-user'}>
                                    <Text style={styles.radioText}>{unselectedRadio}</Text>
                                </RadioButton>
                              </RadioGroup>: <View />}                 
                {chevron ? <Icon name={'angle-right'} size={24} color={colors.darkerGrey}/> : <View />}     
            </View>
          </View>
          {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}
        </View>
      </TouchableHighlight>
    )
  } 
}

export default FormItem;

