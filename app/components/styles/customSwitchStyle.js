import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
  switchContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchLabel: {
    color: colors.darkGrey,
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 10
  },
  errorContainer: {
    paddingVertical: 5,
    alignItems: 'center'
  },
  errorText: {
    color: colors.red,
    textAlign: 'center'
  }
});
