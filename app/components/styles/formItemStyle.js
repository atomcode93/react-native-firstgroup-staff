import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,

  errorContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20
  },

  errorText: {
    color: 'red'
  },

  formItemContainer: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white
  },

  formItemContentContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },

  formItemLabelContainer: {
    marginVertical: 10
  },

  formItemValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  formItemLabelText: {
    color: colors.darkGrey,
    fontWeight: '600'
  },

  formItemValueText: {
    color: colors.darkerGrey,
    fontWeight: '400',
    marginHorizontal: 10
  },

  radioGroup: {
    flexDirection: 'row'
  },

  radioText: {
    color: colors.darkerGrey,
    fontWeight: '400',
  },
  
})
