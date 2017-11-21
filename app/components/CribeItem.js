import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, TouchableHighlight, InteractionManager, TouchableOpacity} from 'react-native';
import {Actions as NavActions, ActionConst as NavActionConst, Scene, Switch} from 'react-native-router-flux';
import {connect} from 'react-redux';
import i18n from '../i18n/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/cribeItemStyle';

import FormItem from '../components/FormItem';
import ModalDropdown from 'react-native-modal-dropdown';

const observes = [
    'Neutral',
    'No',
    'Yes'
]

class CribeItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    _adjustFrame = (style) => {
        style.right -= 55;
    }

    goToBehaviour = (index) => {
        InteractionManager.runAfterInteractions(() => NavActions.behaviour({index: index}));
    }

    _onCribeRemove = () => {
        this.props.onCribeRemove(this.props.cribeIndex);
    }

    _onChangeObserve = (observe) => {
        this.props.onChangeObserve(observe, this.props.cribeIndex);
    }

    render() {
    
        const {cribe, cribeIndex} = this.props;

        return (
            <View style={styles.cribeItemContainer}>
                
                <FormItem 
                    label={i18n.t('behaviour-title')} 
                    value={cribe.behaviour_id} 
                    chevron={true} 
                    onPress={() => this.goToBehaviour(cribeIndex)} 
                    error={null}
                />
                
                <View style={styles.subItemContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{i18n.t('observed')}</Text>
                    </View>
                    
                    <ModalDropdown 
                        defaultValue={i18n.t('observe-neutral')} 
                        style={styles.selectButton}
                        textStyle={styles.selectText}
                        adjustFrame={style => {this._adjustFrame(style)}}
                        dropdownStyle={styles.dropDown}
                        dropdownTextStyle={styles.dropdownText}
                        options={observes} 
                        onSelect={(index, value) => this._onChangeObserve(value)}/>
                    
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.cribeRemoveButton}
                        onPress={this._onCribeRemove}>
                        <Text style={styles.titleText}>{i18n.t('task-remove')}</Text>
                    </TouchableOpacity>
                </View>  
            </View>
        )
    } 
}

export default CribeItem;
    


