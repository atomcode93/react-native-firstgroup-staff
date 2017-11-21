import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, TouchableHighlight, InteractionManager, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import i18n from '../i18n/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/actionItemStyle';


class ActionItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            action: ''
        }
    }
    
    _onChangeAction = (text) => {
        this.props.onChangeAction(text, this.props.actionIndex);
    }

    _onActionRemove = () => {
        this.props.onActionRemove(this.props.actionIndex);
    }

    render() {

        return (
            <View style={styles.actionItemContainer}>
               <View style={styles.subItemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{i18n.t('action-taken1')}</Text>
                    </View>
                    <View style={styles.subitemInput}>
                        <TextInput style={styles.subitemText}
                            editable={true}
                            autoCapitalize = "none"
                            onChangeText = {this._onChangeAction} 
                            value={this.props.action}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.actionRemoveButton}
                        onPress={this._onActionRemove}>
                        <Text style={styles.titleText}>{i18n.t('task-remove')}</Text>
                    </TouchableOpacity>
                </View>     
            </View>
        )
    } 
}
  
export default ActionItem;
    


