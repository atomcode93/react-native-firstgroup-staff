import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,
  scrollView: {
    backgroundColor: colors.lightGrey,
    marginBottom: metrics.tabBarHeight,
    paddingHorizontal: 0,
  },
  profileContainer: {
    flexDirection: 'column'
  },
  profileHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.lightGrey
  },
  profileHeaderText: {
    fontWeight: '500',
    color: colors.darkerGrey
  },
  publishFormContainer: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  infoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGrey,
    textAlign: 'center'
  },
  inputsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  inputsWrapper: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
    paddingHorizontal: 20
  }
})
