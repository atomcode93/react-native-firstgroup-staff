import fonts from './fonts';
import metrics from './metrics';
import colors from './colors';

const applicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      marginTop: metrics.statusBarHeight
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: metrics.baseMargin
    }
  },
  component: {
    tabBar: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderBottomWidth: 1,
      borderColor: colors.grey,
      height: metrics.tabBarHeight,
      borderTopWidth: 1
    }
  }
};

export default applicationStyles;
