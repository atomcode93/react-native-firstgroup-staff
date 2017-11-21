import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,
  scrollView: {
    paddingHorizontal: 30,
    backgroundColor: colors.lightGrey
  },
  firstviewHeader: {
    backgroundColor: colors.white,
    height: metrics.firstviewBannerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: colors.grey
  },
  firstviewHeaderImage: {
    width: 155,
    height: metrics.firstviewHeaderImageHeight,
    paddingVertical: 10
  },
  titleTextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    height: metrics.headerTitleHeight
  },
  titleText: {
    fontSize: 28,
    color: colors.darkGrey
  },
  infoText: {
    fontSize: 14,
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: 8
  },
  passwordForgotLinkContainer: {
    paddingVertical: 25
  },
  passwordForgotLink: {
    textDecorationLine: 'underline',
    color: colors.linkDarkBlue
  },
  loginLinkContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  loginLinkWrapper: {
    paddingLeft: 5
  },
  loginLink: {
    textDecorationLine: 'underline',
    color: colors.linkDarkBlue
  },
  inputsContainer: {
    flexDirection: 'row'
  },
  inputsWrapper: {
    flex: 1
  },
  modal: {
    height: 100,
    width: metrics.screenWidth - 40,
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkBlue
  },
  modalHeader: {
    height: 30,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalHeaderText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12
  },
  modalListRow: {
    borderColor: colors.grey,
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  modalListRowText: {
    fontSize: 18,
    color: colors.darkGrey
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 25
  },
  networkErrorInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.yellow
  },
  networkErrorInfoWrapper: {
    flex: 1
  },
  networkErrorInfoText: {
    fontSize: 13,
    color: colors.darkestGrey,
    textAlign: 'center',
    fontWeight: '600'
  }
});
