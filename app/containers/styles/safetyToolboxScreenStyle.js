import {StyleSheet} from 'react-native';
import {colors, metrics, applicationStyles} from '../../themes';

export default StyleSheet.create({
  ...applicationStyles.screen,

  addImage: {
    fontWeight: '600',
    color: colors.darkGrey
  },

  addTaskTextInput: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },

  addTaskView: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10
  },

  addTaskButton: {
    marginLeft: 10,
    flex: 1,
    height: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.darkerGrey
  },

  borderStyle: {
    borderWidth: 1, 
    borderColor: colors.grey
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 25
  },

  contactContainer: {
    flexDirection: 'column'
  },

  contactHeaderContainer: {
    paddingVertical: 15,
    backgroundColor: colors.lightGrey
  },

  contactHeaderText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.darkerGrey
  },
  
  formContainer: {

  },
  
  formHeaderContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.lightGrey,
    borderBottomWidth: 1,
    borderColor: colors.darkerGrey
  },
 
  formHeaderText: {
     fontSize: 18,
     color: colors.darkerGrey
  },
  
  imageContainer: {
    backgroundColor: colors.white, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 15
  },

  imageSubView: {
    flexDirection: 'row',
    marginBottom: 15
  },

  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.darkerGrey,
    width: 100,
    height: 25
  },

  imageText: {
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    fontSize: 13,
    paddingLeft: 10
  },

  infoText: {
    textAlign: 'center'
  },

  taskText: {
    height: 30,
    paddingLeft: 10,
    fontSize: 15, 
    borderColor: colors.darkerGrey,
    borderWidth: 1,
    borderRadius: 5
  },

  obsertextContainer: {
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },

  recomHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGrey,
  },

  recomHeaderText: {
    fontSize: 18,
    color: colors.darkGrey
  },

  scrollView: {
    backgroundColor: colors.lightGrey,
    marginBottom: metrics.tabBarHeight,
    paddingHorizontal: 0,
  },

  taskLimitText: {
    fontSize: 13,
    color: colors.darkGrey
  },

  titleContainer: {
    justifyContent: 'center'
  },

  titleText: {
      fontWeight: '600', 
      color: colors.darkGrey
  }

})
