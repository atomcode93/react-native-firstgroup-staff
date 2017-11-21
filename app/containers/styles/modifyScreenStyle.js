import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,
  scrollView: {
    paddingHorizontal: 30,
    backgroundColor: colors.lightGrey
  },
  infoTextContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  infoText: {
    fontSize: 14,
    color: colors.darkGrey,
    textAlign: 'center'
  },
  inputsContainer: {
    flexDirection: 'row'
  },
  inputsWrapper: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 25
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
  link: {
    textDecorationLine: 'underline',
    color: colors.linkDarkBlue,
    textAlign: 'center'
  }
});
