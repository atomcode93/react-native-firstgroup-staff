import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, TouchableHighlight, InteractionManager, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions as NavActions, ActionConst as NavActionConst, Scene, Switch} from 'react-native-router-flux';
import actions from '../actions/creators';
import ModalDropdown from 'react-native-modal-dropdown';
import DatetimeItem from './DatetimeItem';
import FormItem from './FormItem';
import ActionItem from './ActionItem';
import i18n from '../i18n/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/taskItemStyle';

const risks = [
    'Low',
    'Medium',
    'High'
];

class TaskItem extends Component {

    static propTypes = {
        task: PropTypes.object.isRequired,
        onActionTaken: PropTypes.func.isRequired,
        onTaskRemove: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            risk: i18n.t('assignee-medium')
        }
    }
    
    _adjustFrame = (style) => {
        style.right -= 55;
    }

    goToAssignee= (index) => {
        InteractionManager.runAfterInteractions(() => NavActions.assignee({index: index}));
    }

    _onConfirmDate = (date, index) => {
        this.props.onConfirmDate(date, index);
    }

    _onConfirmTime = (time, index) => {
        this.props.onConfirmTime(time, index);
    }

    _onChangeTaskTitle = (text) => {
        this.setState({taskTitle: text});
        this.props.onChangeTaskTitle(text, this.props.taskIndex);
    }

    _onChangeRisk = (risk) => {
        this.setState({risk: risk});
        this.props.onChangeRisk(risk, this.props.taskIndex);
    }

    _onTaskRemove = (index) => {
        this.props.onTaskRemove(index);
    }

    _onActionTaken = (index) => {
        this.props.onActionTaken(index);
    }

    _onChangeAction = (action, actionIndex) => {
        this.props.onChangeAction(action, actionIndex, this.props.taskIndex);
    }

    _onActionRemove = (actionIndex) => {
        this.props.onActionRemove(actionIndex, this.props.taskIndex);
    }

    render() {
        
        const {
            task,
            taskIndex,
            handleActionTaken, 
            handleTaskRemove
        } = this.props;
        
        return (
            <View style={styles.taskItemContainer}>
                <DatetimeItem
                    index = {taskIndex}  
                    onConfirmDate={this._onConfirmDate}
                    onConfirmTime={this._onConfirmTime}
                />
                <View style={styles.subItemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{i18n.t('recom-task')}</Text>
                    </View>
                    <View style={styles.subitemInput}>
                        <TextInput style={styles.subitemText}
                            editable={true}
                            autoCapitalize = "none"
                            onChangeText = {this._onChangeTaskTitle} 
                            value={task.title}/>
                    </View>
                </View>

                <FormItem 
                    label={i18n.t('assignee-title')} 
                    value={task.contact_id} 
                    chevron={true} 
                    onPress={() => this.goToAssignee(taskIndex)} 
                    error={null}
                />

                <View style={styles.subItemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{i18n.t('risk')}</Text>
                    </View>
                    
                    <ModalDropdown 
                        defaultValue={i18n.t('medium-risk')} 
                        style={styles.selectButton}
                        textStyle={styles.selectText}
                        adjustFrame={style => {this._adjustFrame(style)}}
                        dropdownStyle={styles.dropDown}
                        dropdownTextStyle={styles.dropdownText}
                        options={risks} 
                        onSelect={(index, value) => this._onChangeRisk(value)}/>
                    
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.taskItemButton}
                        onPress={() => this._onActionTaken(taskIndex)}>
                        <Text style={{fontWeight: '600', color: colors.darkGrey}}>{i18n.t('action-taken')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.taskItemButton}
                        onPress={() => this._onTaskRemove(taskIndex)}>
                        <Text style={{fontWeight: '600', color: colors.darkGrey}}>{i18n.t('task-remove')}</Text>
                    </TouchableOpacity>
                </View>
                {task.action_taken.map((action, index) => {
                    return(
                        <ActionItem
                            key={index}
                            actionIndex={index}
                            onChangeAction={this._onChangeAction} 
                            onActionRemove={this._onActionRemove}
                            action={task.action_taken[index]}
                        />
                    )
                })}
            </View>
        )
    } 
}
 
export default TaskItem;

    


