import {StyleSheet} from 'react-native';
import {colors} from '../../themes';

export default StyleSheet.create({
   
    buttonContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cribeItemContainer: {
        backgroundColor: colors.white,
        paddingBottom: 20
    },

    dropDown: {
        width: 160,
        borderColor: colors.darkGrey,
        borderRadius: 5
    },

    dropdownText: {
        fontSize: 13,
        color: colors.darkGrey,
        textAlign: 'center'
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

    selectButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.darkerGrey,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 30
    },
    
    selectText: {
        fontSize: 13
    },

    cribeRemoveButton: {
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
