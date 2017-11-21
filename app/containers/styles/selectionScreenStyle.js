import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,

  autocompleteContainer: {
    marginLeft: 10, 
    marginRight: 10
  },
  
  dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterView: {
    flex: 1
  },

  filterText: {
    height: 30,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: colors.darkerGrey,
    borderWidth: 1,
    borderRadius: 5
  },

  itemListRow: { 
    height: 60,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.grey
  },

  itemListRowText: {
    color: colors.darkGrey,
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 20
  },

  listView: {
    flex: 1,
    backgroundColor: colors.white
  },

  scrollView: {
    backgroundColor: colors.lightGrey,
    marginBottom: 0,
    paddingHorizontal: 0,
  },

  selectionHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.lightGrey
  },

  selectionText: {
    color: 'grey'
  }

})
