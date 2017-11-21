import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, 
  View, 
  Text, 
  Keyboard, 
  LayoutAnimation, 
  Picker, 
  TouchableHighlight,
  TouchableOpacity, 
  TextInput, 
  Image,
  Button,
  InteractionManager,
  findNodeHandle
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {get} from 'lodash';
import TextInputState from 'TextInputState';
import dismissKeyboard from 'dismissKeyboard';
import {Actions as NavActions, ActionConst as NavActionConst, Scene, Switch} from 'react-native-router-flux';
import Fabric from 'react-native-fabric';
import CustomButton from '../../components/CustomButton';
import MainToolbar from '../../components/MainToolbar';
import CustomTextArea from '../../components/CustomTextArea';
import DatetimeItem from '../../components/DatetimeItem';
import CribeItem from '../../components/CribeItem';
import FormItem from '../../components/FormItem';
import TaskItem from '../../components/TaskItem';
import i18n from '../../i18n/i18n.js';
import actions from '../../actions/creators';
import {validate} from '../../utils/validationUtils';
import {colors, metrics} from '../../themes';
import {trackScreenView} from '../../services/googleAnalytics';
import styles from '../styles/safetyToolboxScreenStyle';

const {Answers} = Fabric;

class ContactScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        profile: PropTypes.object
    };

    static contextTypes = {
        dropdownAlert: PropTypes.object,
        confirmationDialog: PropTypes.object
    };

    constructor(props) {

        super(props);

        this.state = {
            form: {
                submitterType: 1,
                submitter: '',
                submitterLocation: '',
                submitterDepartment: '',
                submitterJobRole: '',
                refNumber: '',
                location: '',
                division: '',
                company: '',
                district: '',
                convDateTime: '',
                category: '',
                contactPersonType: 1,
                contactPerson: '',
                occurrence: 0,
                observation: '',
                images: [{}, {}, {}],
                tasks: [],
                criBes: []
            },
            
            visibleHeight: this.getScrollViewHeight(),
            category_id: '',
            location_id: '',
            company_id: '',
            division_id: '',
            district_id: '',
            pickedDate: '',
            pickedTime: '',
            taskDate: [],
            taskTime: [],
            formErrors: null,
            validateFlag: false,
            imageSources: ['','', '']
        };

        this.formConstraints = {
            submitter: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            submitterLocation: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            location: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            division: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            company: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            district: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            convDateTime: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            },
            category: (value) => {
                if (!value) {
                    return i18n.t('validation-presence');
                }
                return null;
            }
        };

        this.title = i18n.t('contact-title');
    }

    componentWillMount() {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

        const {dispatch} = this.props;
        dispatch(actions.getRefNumber());
        dispatch(actions.getCategories());

    }

    componentWillReceiveProps(nextProps) {

        const {form, validateFlag} = this.state;
        const {dispatch, contactAddSubmitting, contactAddErrors, contactAddErrorMessage, contactAddErrorCode} = nextProps;
        const division_id = nextProps.location.division_id;
        const {contactAddSubmitting: oldContactAddSubmitting} = this.props;
        const {dropdownAlert, confirmationDialog} = this.context;

        dispatch(actions.getBehaviours(division_id));
        
        const submitter_id = nextProps.submitter.id;

        const submitter_first_name = nextProps.submitter.first_name;
        const submitter_last_name = nextProps.submitter.last_name;

        let submitterName = '';

        if (submitter_first_name !== undefined && submitter_last_name !== undefined)
            submitterName = submitter_first_name + ' ' + submitter_last_name;

        let submitterLocation = '';
        let submitterDepartment = ''; 
        let submitterJobRole = '';

        if (nextProps.submitter.location_name !== undefined)
            submitterLocation = nextProps.submitter.location_name;
        if (nextProps.submitter.department_name !== undefined)
            submitterDepartment = nextProps.submitter.department_name;
        if (nextProps.submitter.job_role_name !== undefined)
            submitterJobRole = nextProps.submitter.job_role_name;

        let location = '';
        let division = '';
        let company = '';
        let district = '';
        let location_id = '';
        let company_id = '';
        let district_id = '';

        if (nextProps.location.name !== undefined)
            location = nextProps.location.name;
        if (nextProps.location.division_name !== undefined)
            division = nextProps.location.division_name;
        if (nextProps.location.company_name !== undefined)
            company = nextProps.location.company_name; 
        if (nextProps.location.district_name !== undefined)
            district = nextProps.location.district_name;  
        if (nextProps.location.id !== undefined)
            location_id = nextProps.location.id;
        if (nextProps.location.company_id !== undefined)
            company_id = nextProps.location.company_id; 
        if (nextProps.location.district_id !== undefined)
            district_id = nextProps.location.district_id;  

        const categoryName = nextProps.category;

        if (categoryName) {
            const categories = this.props.categories;
            categories.map((category, index) => {
                if (category.name === categoryName) {
                    this.setState({category_id: category.id})
                }
            })
        }

        const contact_person_id = nextProps.contactPerson.id;

        const contact_first_name = nextProps.contactPerson.first_name;
        const contact_last_name = nextProps.contactPerson.last_name;

        let contactPerson = '';

        if (contact_first_name !== undefined && contact_last_name !== undefined) 
            contactPerson = contact_first_name + ' ' + contact_last_name;

        const assignee_first_name = nextProps.assignee.first_name;
        const assignee_last_name = nextProps.assignee.last_name;

        let assigneeName = '';

        if (assignee_first_name !== undefined && assignee_last_name !== undefined)
            assigneeName = assignee_first_name + ' ' + assignee_last_name;

        let tempTasks = form.tasks;
        tempTasks.map((task, index) => {
            if (index === nextProps.assigneeIndex) 
                task.contact_id = assigneeName;
        })

        let behaviour = nextProps.behaviour;
        let tempCribes = form.criBes;
        tempCribes.map((cribe, index) => {
            if (index === nextProps.behaviourIndex) 
                cribe.behaviour = behaviour;
        })
        
        let convDateTime = '';
        
            if (this.state.pickedDate || this.state.pickedTime)
                convDateTime = 'DateTime';
            
        if (oldContactAddSubmitting && !contactAddSubmitting) {
            const errorMessage = contactAddErrorMessage || contactAddErrorCode;
            if (contactAddErrors) {
                this.setState({formErrors: contactAddErrors});
            } else if (errorMessage) {
                dropdownAlert.alert('error', i18n.t('error'), errorMessage.toString());
            } else {
                // this.formReset();
                confirmationDialog.show(i18n.t('contact-contactSent'));
            }
        }

        if (validateFlag) {
            const contactObj = {
                submitter: submitterName,
                submitterLocation: submitterLocation,
                location: location,
                division: division,
                company: company,
                district: district,
                convDateTime: convDateTime,
                category: categoryName
            }
            const formErrors = validate(contactObj, this.formConstraints);
            this.setState({formErrors});
        }
        
        this.setState({form: {...form, submitter: submitterName,
            submitterLocation,
            submitterDepartment,
            submitterJobRole,
            refNumber: nextProps.refNumber,
            location,
            division,
            company,
            district,
            category: categoryName,
            contactPerson,
            tasks: tempTasks,
            criBes: tempCribes,
        }});
        this.setState({submitter_id, location_id, division_id, company_id, district_id, contact_person_id});
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentDidMount() {
        trackScreenView(this.title);
    }

    combineDatetime = (pickedDate, pickedTime) => {
        
        let date, month, year, hour, minute = '';

        if (pickedDate) {
            date = pickedDate.getDate();
            month = pickedDate.getMonth();
            year = pickedDate.getYear();
        }

        if (pickedTime) {
            hour = pickedTime.getHours();
            minute = pickedTime.getMinutes();
        }
        
        if (date) {
            if (date < 10)
            date = '0' + date;
            else
                date = date;
        }
        
        if (month) {
            month = month + 1
            if (month < 10)
                month = '0' + month;
            else
                month = month;
        }
        
        if (year) {
            if (year >= 100) {
                year = year - 100 + 2000;
            }
            else
                year = year + 1900;
        }
        
        if (hour) {
            if (hour < 10) 
                hour = '0' + hour;
            else 
                hour = hour;
        }
        
        if (minute) {
            if (minute < 10) 
                minute = '0' + minute;
            
            else 
                minute = minute;
        }

       let conversationDate = '';

       if (date && month && year) {
           conversationDate = conversationDate + year + '-' + month + '-' + date;
       }
       if (hour && minute) {
           conversationDate = conversationDate + 'T' + hour + ':' + minute;
       }
        return conversationDate;
    }

    formReset = () => {
        const {dispatch} = this.props;
        dispatch(actions.resetSubmitter());
        dispatch(actions.resetLocation());
        dispatch(actions.resetContactPerson());
        dispatch(actions.resetCategory());
        this.state({form: {...form, submitterType: 1,
            convDateTime: '',
            contactPersonType: 1,
            occurrence: 0,
            observation: '',
            images: [{}, {}, {}],
            tasks: [],
            criBes: []
        }})
    }

    getNodeHandle() {
        return findNodeHandle(this.refs.observation);
    }

    getScrollViewHeight = () => {
        return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight - metrics.tabBarHeight;
    }

    goToSubmittedBy = () => {
        InteractionManager.runAfterInteractions(() => NavActions.submittedBy());
    }

    goToLocation = () => {
        InteractionManager.runAfterInteractions(() => NavActions.location());
    }

    goToDepartment = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.department());
    }

    goToJobrole = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.jobrole());
    }

    goToDivision = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.division());
    }

    goToCompany = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.company());
    }

    goToDistrict = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.district());
    }

    goToCategory = () => {
        const {profile} = this.props;
        InteractionManager.runAfterInteractions(() => NavActions.category());
    }

    goToContactPerson = () => {
        if (this.state.form.location) {
            const {dispatch, location} = this.props;
            dispatch(actions.getContactPersons(location.id));
            InteractionManager.runAfterInteractions(() => NavActions.contactPerson());
        }
    }

    handleObservation = (text) => {
        this.setState({obserText: text});
    }

    handleChangeTaskTitle = (text) => {
        this.setState({taskTitle: text});
    }

    handleAddContact = () => {

        const {form, taskDate, taskTime, pickedDate, pickedTime} = this.state;
        const {dispatch} = this.props;
        
        let tempTasks = form.tasks; 
        tempTasks.map((task, index) => {
            task.created = this.combineDatetime(taskDate[index], taskTime[index]);
        })
        
        const convDateTime = this.combineDatetime(pickedDate, pickedTime);

        let contactObj = {};
            contactObj = {
                submitteType: form.submitterType,
                submitter: form.submitter,
                submitterLocation: form.submitterLocation,
                refNumber: form.refNumber,
                location: form.location,
                division: form.division,
                company: form.company,
                district: form.district,
                convDateTime: convDateTime,
                category: form.category,
                contactPersonType: form.contactPersonType,
                contactPerson: form.contactPerson,
                occurrence: form.occurrence,
                observation: form.observation,
                images: form.images,
                tasks: tempTasks,
                criBes: form.criBes
            }

        const formErrors = validate(contactObj, this.formConstraints);
    
        this.setState({formErrors, validateFlag: true});

        if (formErrors === null) {
            if (form.submitterType === 1) {
                if (form.contactPersonType === 1)
                    contactData = {
                        submitter_type: form.submitterType,
                        submitter_id: this.state.submitter_id,
                        reference_num: form.refNumber,
                        location_id: this.state.location_id,
                        division_id: this.state.division_id,
                        company_id: this.state.company_id,
                        district_id: this.state.district_id,
                        conversation_date: convDateTime,
                        category_id: this.state.category_id,
                        contact_person_type: form.contactPersonType,
                        contact_person_id: this.state.contact_person_id,
                        occurrence: form.occurrence,
                        observations: form.observation,
                        images: form.images,
                        tasks: tempTasks,
                        critical_behaviours: form.criBes
                    }
                
                else
                    contactData = {
                        submitter_type: form.submitterType,
                        submitter_id: this.state.submitter_id,
                        reference_num: form.refNumber,
                        location_id: this.state.location_id,
                        division_id: this.state.division_id,
                        company_id: this.state.company_id,
                        district_id: this.state.district_id,
                        conversation_date: convDateTime,
                        category_id: this.state.category_id,
                        contact_person_type: form.contactPersonType,
                        contact_person_name: form.contactPerson,
                        occurrence: form.occurrence,
                        observations: form.observation,
                        images: form.images,
                        tasks: tempTasks,
                        critical_behaviours: form.criBes
                    }
            }

            else {
                if (form.contactPersonType === 1)
                    contactData = {
                        submitter_type: form.submitterType,
                        submitter_name: form.submitter,
                        reference_num: form.refNumber,
                        location_id: this.state.location_id,
                        division_id: this.state.division_id,
                        company_id: this.state.company_id,
                        district_id: this.state.district_id,
                        conversation_date: convDateTime,
                        category_id: this.state.category_id,
                        contact_person_type: form.contactPersonType,
                        contact_person_id: this.state.contact_person_id,
                        occurrence: form.occurrence,
                        observations: form.observation,
                        images: form.images,
                        tasks: tempTasks,
                        critical_behaviours: form.criBes
                    }
            
                else
                    contactData = {
                        submitter_type: form.submitterType,
                        submitter_name: form.submitter,
                        reference_num: form.refNumber,
                        location_id: this.state.location_id,
                        division_id: this.state.division_id,
                        company_id: this.state.company_id,
                        district_id: this.state.district_id,
                        conversation_date: convDateTime,
                        category_id: this.state.category_id,
                        contact_person_type: form.contactPersonType,
                        contact_person_name: form.contactPerson,
                        occurrence: form.occurrence,
                        observations: form.observation,
                        images: form.images,
                        tasks: tempTasks,
                        critical_behaviours: form.criBes
                    }
            }
               
            dispatch(actions.addContact(JSON.stringify(contactData)));
            this.formReset();
        }
    }

    handleAddTask = (taskTitle) => {
        const {form, taskDate, taskTime} = this.state;
        let tempTasks = form.tasks;
        let task = {
            created: '',
            title: taskTitle,
            contact_id: '',
            risk: i18n.t('medium-risk'),
            action_taken: []
        }
        tempTasks.push(task);
        let tempTaskDate = taskDate;
        tempTaskDate.push('');
        let tempTaskTime = taskTime;
        tempTaskTime.push('');
        this.setState({taskTitle: '', taskDate: tempTaskDate, taskTime: tempTaskTime});
        this.setState({form: {...form, tasks: tempTasks}});
    }

    handleAddCribe = () => {
        const {form} = this.state;
        let temp = form.criBes;
        let criBe = {
            behaviour_id: '',
            score_id: 'Neutral'
        }
        temp.push(criBe);
        this.setState({form: {...form, criBes: temp}});
    }

    handleImagePicker = (key) => {

        const {form} = this.state;
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
                return response.didCancel;
            }
            else if (response.error) {
                return response.error;
            }
            else if (response.customButton) {
                return response.customButton;
            }
            else {
                
                let tempImages = form.images;
                tempImages[key] = {
                    content_length: response.fileSize, 
                    content_type: 'image/png', 
                    file_name: response.fileName, 
                    content: response.data
                }
                let sources = this.state.imageSources;
                sources[key] = response.uri.replace('file://', '');
                this.setState({form: {...form, images: tempImages}});
                this.setState({imageSources: sources});
            }
        })
    }

    handleCapture = (e) => {
        const focusField = TextInputState.currentlyFocusedField();
        const target = e.nativeEvent.target;
        if (focusField != null && target != focusField) {
          const {observation} = this.refs;
          const inputs = [this.getNodeHandle()];
          if (inputs && inputs.indexOf(target) === -1) {
            dismissKeyboard();
          }
        }
    }

    keyboardDidShow = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        let newSize = this.getScrollViewHeight() - e.endCoordinates.height;
        this.setState({
        visibleHeight: newSize
        });
    };

    keyboardDidHide = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            visibleHeight: this.getScrollViewHeight()
        });
    };

    onSelectSubmitterType = (index, value) => {
        const {form} = this.state;
        if (value === 'user') {
            this.setState({form: {...form, submitterType: 1}});
        }
            
        else {
            this.setState({form: {...form, submitterType: 2}});
        }
    }

    onSelectContactPersonType = (index, value) => {
        const {form} = this.state;
        if (value === 'user')
            this.setState({form: {...form, contactPersonType: 1}});
        else
            this.setState({form: {...form, contactPersonType: 2}});
    }

    onSelectOccurrence = (index, value) => {
        const {form} = this.state;
        if (value === 'user')
            this.setState({form: {...form, occurrence: 0}});
        else
            this.setState({form: {...form, occurrence: 1}});
    }

    _onActionTaken = (index) => {
        const {form} = this.state;
        let tempTasks = form.tasks;
        let tempTask = tempTasks[index];
        tempTask.action_taken.push('');
        tempTasks[index] = tempTask;
        this.setState({form: {...form, tasks: tempTasks}});
    }

    _onTaskRemove = (index) => {
        const {form} = this.state;
        var temp = form.tasks;
        temp.splice(index, 1);
        this.setState({form: {...form, tasks: temp}});
    }

    _onConfirmDate = (date, index) => {
        const {form} = this.state;
        if (index < 0 ) {
            if (this.state.validateFlag) {
                const obj = {
                    submitter: form.submitter,
                    submitterLocation: form.submitterLocation,
                    location: form.location,
                    division: form.division,
                    company: form.company,
                    district: form.district,
                    category: form.category,
                    convDateTime: 'pickedDate'
                }
                const formErrors = validate(obj, this.formConstraints);
                this.setState({pickedDate: date, formErrors});
            }
            else
                this.setState({pickedDate: date});
        }
        else {
            const {taskDate} = this.state;
            let tempTaskDate = taskDate;
            tempTaskDate[index] = date;
            this.setState({taskDate: tempTaskDate});
        }
    }

    _onConfirmTime = (time, index) => {
        const {form} = this.state;
        if (index < 0 ) {
            if (this.state.validateFlag) {
                const obj = {
                    submitter: form.submitter,
                    submitterLocation: form.submitterLocation,
                    location: form.location,
                    division: form.division,
                    company: form.company,
                    district: form.district,
                    category: form.category,
                    convDateTime: 'pickedTime'
                }
                const formErrors = validate(obj, this.formConstraints);
                this.setState({pickedTime: time, formErrors});
            }
            else
                this.setState({pickedTime: time});
        }
        else {
            const {taskTime} = this.state;
            let tempTaskTime = taskTime;
            tempTaskTime[index] = time;
            this.setState({taskTime: tempTaskTime});
        }
    }

    _onChangeTaskTitle = (text, index) => {
        const {form} = this.state;
        var tempTasks = form.tasks;
        var tempTask = tempTasks[index];
        tempTask.title = text;
        tempTasks[index] = tempTask;
        this.setState({form: {...form, tasks: tempTasks}});
    }

    _onChangeRisk = (risk, index) => {
        const {form} = this.state;
        var tempTasks = form.tasks;
        var tempTask = tempTasks[index];
        tempTask.risk = risk;
        tempTasks[index] = tempTask;
        this.setState({form: {...form, tasks: tempTasks}});
    }

    _onChangeAction = (action, actionIndex, taskIndex) => {
        const {form} = this.state;
        var tempTasks = form.tasks;
        var tempTask = tempTasks[taskIndex];
        tempTask.action_taken[actionIndex] = action;
        tempTasks[taskIndex] = tempTask;
        this.setState({form: {...form, tasks: tempTasks}});
    }

    _onChangeObserve = (observed, index) => {
        const {form} = this.state;
        var tempCribes = form.criBes;
        var tempCribe = tempCribes[index];
        tempCribe.score_id = observed;
        tempCribes[index] = tempCribe;
        this.setState({form: {...form, criBes: tempCribes}});
    }

    _onActionRemove = (actionIndex, taskIndex) => {
        const {form} = this.state;
        var tempTasks = form.tasks;
        var tempTask = tempTasks[taskIndex];
        var tempActions = tempTask.action_taken
        tempActions.splice(actionIndex, 1);
        tempTask.action_taken = tempActions;
        tempTasks[taskIndex] = tempTask;
        this.setState({form: {...form, tasks: tempTasks}});
    }

    _onCribeRemove = (cribeIndex) => {
        const {form} = this.state;
        var temp = form.criBes;
        temp.splice(cribeIndex, 1);
        this.setState({form: {...form, criBes: temp}});
    }

   

    renderContactForm() {
     
        const {form, formErrors} = this.state;
        const {contactAddSubmitting} = this.props;
    
        return(
            <View style={styles.contactContainer}>
                <View style={styles.contactHeaderContainer}>
                    <Text style={styles.contactHeaderText}>{i18n.t('contact-creatingInstructions')}</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formHeaderContainer}>
                        <Text style={styles.formHeaderText}>{i18n.t('submitter-form')}</Text>
                    </View>
                    <FormItem 
                        label={i18n.t('submitterType-text')} 
                        chevron={false}
                        radioType={'userRadio'}
                        onPress={(index, value)=>this.onSelectSubmitterType(index, value)}  
                    />
                    <FormItem 
                        label={i18n.t('submittedBy-text')} 
                        value={form.submitter}
                        chevron={true} 
                        onPress={this.goToSubmittedBy} 
                        error={get(formErrors, 'submitter')}
                    />
                    {form.submitterType === 1 && 
                        <View>
                            <FormItem 
                                label={i18n.t('profile-location')} 
                                value={form.submitterLocation} 
                                chevron={false} 
                                error={get(formErrors, 'submitterLocation')}
                            />
                            <FormItem 
                                label={i18n.t('department-text')} 
                                value={form.submitterDepartment} 
                                chevron={false} 
                            />
                            <FormItem 
                                label={i18n.t('jobRole-title')} 
                                value={form.submitterJobRole} 
                                chevron={false} 
                            />
                        </View>}
                </View>

                <View style={styles.formContainer}>
                    <View style={[styles.formHeaderContainer, {height: 40, justifyContent: 'flex-end'}]}>
                        <Text style={styles.formHeaderText}>{i18n.t('contact-detail')}</Text>
                    </View>
                    <FormItem 
                        label={i18n.t('refNum-text')} 
                        value={form.refNumber} 
                        chevron={false} 
                    />
                    <FormItem 
                        label={i18n.t('profile-location')} 
                        value={form.location} 
                        chevron={true} 
                        onPress={this.goToLocation} 
                        error={get(formErrors, 'location')}
                    />
                    <FormItem 
                        label={i18n.t('division-text')} 
                        value={form.division} 
                        chevron={false} 
                        error={get(formErrors, 'division')}
                    />
                    <FormItem 
                        label={i18n.t('company-text')} 
                        value={form.company} 
                        chevron={false} 
                        error={get(formErrors, 'company')}
                    />
                    <FormItem 
                        label={i18n.t('district-text')} 
                        value={form.district} 
                        chevron={false} 
                        error={get(formErrors, 'district')}
                    />    
                    <DatetimeItem
                        index = {-1} 
                        onConfirmDate={this._onConfirmDate}
                        onConfirmTime={this._onConfirmTime}
                        error={get(formErrors, 'convDateTime')}
                    />
                    <View style={styles.borderStyle}></View>
                    <FormItem 
                        label={i18n.t('category-text')} 
                        value={form.category} 
                        chevron={true} 
                        onPress={this.goToCategory} 
                        error={get(formErrors, 'category')}
                    />
                    <FormItem 
                        label={i18n.t('contactPersonType-text')} 
                        chevron={false}
                        radioType={'userRadio'}
                        onPress={(index, value)=>this.onSelectContactPersonType(index, value)}  
                    />
                    <FormItem 
                        label={i18n.t('contactPerson-text')} 
                        value={form.contactPerson} 
                        chevron={true} 
                        onPress={this.goToContactPerson} 
                        error={get(formErrors, 'contactPerson')}
                    />
                    <FormItem 
                        label={i18n.t('occurrence-text')} 
                        chevron={false}
                        radioType={'occuRadio'} 
                        onPress={(index, value)=>this.onSelectOccurrence(index, value)}
                    />
                </View>

                <View>
                    <View style={[styles.formHeaderContainer, {height: 40, justifyContent: 'flex-end'}]}>
                        <Text style={[styles.formHeaderText, {fontWeight: '600'}]}>{i18n.t('observation')}</Text>
                    </View>
                    <View style={styles.obsertextContainer}>
                        <CustomTextArea
                            ref="observation"
                            error={get(formErrors, 'observation')}
                            textInput={{
                                numberOfLines: 6,
                                multiline: true,
                                value: form.observation,
                                autoCapitalize: 'sentences',
                                onChangeText: observation => this.setState({form: {...form, observation}}),
                                editable: !contactAddSubmitting
                            }}
                        />
                    </View>
                </View>

                <View>
                    <View style={[styles.formHeaderContainer, {height: 40, justifyContent: 'flex-end'}]}>
                        <Text style={[styles.formHeaderText, {fontWeight: '600'}]}>{i18n.t('image')}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        {this.state.imageSources.map((source, index) => {
                            return (
                                <View key={index} style={styles.imageSubView}>
                                    <TextInput style={styles.imageText}
                                        editable={true}
                                        autoCapitalize = 'none'
                                        value={source} />
                                    <TouchableOpacity onPress={(key) => this.handleImagePicker(index)}>
                                        <View style={styles.imagePicker}>
                                            <Text style={styles.addImage}>
                                                {i18n.t('add-image')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>     
                            )
                        })}
                    </View>
                </View>
            
                <View>
                    <View style={styles.recomHeaderContainer}>
                        <Text style={styles.recomHeaderText}>{i18n.t('recommend')}</Text>
                        <Text style={styles.taskLimitText}>{i18n.t('add-recom-text')}</Text>
                    </View>
                    <View style={styles.addTaskView}>
                        <View style={styles.addTaskTextInput}>
                            <TextInput style={styles.taskText}
                                editable={true}
                                autoCapitalize = "none"
                                onChangeText = {this.handleChangeTaskTitle} 
                                value={this.state.taskTitle}/>
                        </View>
                        <TouchableOpacity 
                            style={styles.addTaskButton}
                            onPress={() => this.handleAddTask(this.state.taskTitle)}>
                            <Text style={styles.titleText}>{i18n.t('add-button-text')}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.form.tasks.map((task, index) => {
                        return (
                            <TaskItem 
                                task={task}
                                key={index}
                                taskIndex={index}
                                onConfirmDate={this._onConfirmDate}
                                onConfirmTime={this._onConfirmTime}
                                onChangeTaskTitle={this._onChangeTaskTitle}
                                onChangeRisk={this._onChangeRisk}
                                onActionTaken={this._onActionTaken} 
                                onTaskRemove={this._onTaskRemove}
                                onChangeAction={this._onChangeAction}
                                onActionRemove={this._onActionRemove}
                            />
                        )
                    })}
                    <View>
                        <View style={[styles.formHeaderContainer, {height: 40, justifyContent: 'flex-end'}]}>
                            <Text style={[styles.formHeaderText, {fontWeight: '600'}]}>{i18n.t('critical')}</Text>
                        </View>
                        <View style={styles.addTaskView}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{i18n.t('add-critic-text')}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.addTaskButton}
                                onPress={this.handleAddCribe}>
                                <Text style={styles.titleText}>{i18n.t('add-button-text')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.form.criBes.map((cribe, index) => {
                        return (
                            <CribeItem
                                key={index}
                                cribeIndex={index}
                                cribe={cribe}
                                onCribeRemove={this._onCribeRemove}
                                onChangeObserve={this._onChangeObserve}
                            />
                        )
                    })}
                
                    <View style={styles.buttonContainer}>
                        <CustomButton onPress={this.handleAddContact} label={i18n.t('create-contact-button-text')} showSpinner={contactAddSubmitting}/>
                    </View>
                    
                </View>
            </View>
        );       
    }
  
    render() {
        
        return (
            <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
                <MainToolbar title={this.title} />
                <ScrollView
                    contentContainerStyle={{paddingBottom: metrics.scrollViewPaddingBottom}}
                    style={[styles.scrollView, {height: this.state.visibleHeight}]}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="none"
                >
                    {this.renderContactForm()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {

  return {
    submitter: state.submitter.submitterData,
    refNumber: state.refnumber.refNumberData,
    location: state.location.locationData,
    category: state.category.category,
    categories: state.category.categoriesData,
    contactPerson: state.contactperson.contactPersonData,
    assignee: state.assignee.assigneeData,
    assigneeIndex: state.assignee.assigneeIndex,
    behaviour: state.behaviour.behaviourData,
    behaviourIndex: state.behaviour.behaviourIndex,
    contactAddSubmitting: state.createcontact.contactAddSubmitting,
    contactAddErrorCode: state.createcontact.contactAddErrorCode,
    contactAddErrors: state.createcontact.contactAddErrors,
    contactAddErrorMessage: state.createcontact.contactAddErrorMessage
  }
};

export default connect(mapStateToProps)(ContactScreen);
