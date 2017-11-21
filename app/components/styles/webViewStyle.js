import {StyleSheet} from 'react-native';
import {applicationStyles, colors, metrics} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,
  webViewTab: {
    marginTop: 0,
    backgroundColor: colors.lightGrey,
    height: metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight - metrics.tabBarHeight,
    marginBottom: metrics.tabBarHeight
  },
  webView: {
    marginTop: 0,
    backgroundColor: colors.lightGrey,
    height: metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight,
    marginBottom: metrics.tabBarHeight
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
