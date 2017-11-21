import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
   
    actionItemContainer: {
        backgroundColor: colors.white
    },

    buttonContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },

    subItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 20
    },

    subitemInput: {
        marginLeft: 10,
        flex: 1
    },

    subitemText: {
        height: 30,
        borderColor: colors.darkerGrey,
        borderWidth: 1,
        borderRadius: 5
    },

    actionRemoveButton: {
        width: '50%',
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.darkerGrey
    },

    titleContainer: {
        justifyContent: 'center'
    },

    titleText: {
        fontWeight: '600', 
        color: colors.darkGrey
    }
      
})
