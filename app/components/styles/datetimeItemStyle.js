import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,

  datetimeItemContainer: {
    height: 60,
    backgroundColor: colors.white,
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  datetimeItemLabelContainer: {
    flex: 1
  },

  datetimeItemLabelText: {
    color: colors.darkGrey,
    fontWeight: '600'
  },

  datetimeControlView: {
    flexDirection: 'row',
    flex: 2,
    height: 35, 
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.darkerGrey
  },

  datetimeTextView: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRightWidth: 1
  },

  datetimeText: {
    fontWeight: '600',
    color: colors.darkGrey
  },

  datetimeIcon: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  errorContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20
  },

  errorText: {
    color: 'red'
  }

})
