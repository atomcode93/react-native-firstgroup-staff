import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/tabIconStyle';

const TabIcon = ({selected, title, iconCode}) => {
  const color = selected ? colors.darkGreen : colors.darkGrey;
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIconText, {color}]}>
        {title}
      </Text>
      <Icon name={iconCode} size={20} color={color} />
    </View>
  );
}

TabIcon.propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    iconCode: PropTypes.string
}

export default TabIcon;
