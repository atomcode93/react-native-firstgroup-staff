import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    ListView,
    View, 
    Text, 
    Keyboard, 
    LayoutAnimation, 
    TouchableHighlight, 
    InteractionManager
} from 'react-native';

import {connect} from 'react-redux';
import {get} from 'lodash';
import dismissKeyboard from 'dismissKeyboard';
import {Actions as NavActions, ActionConst as NavActionConst, Scene, Switch} from 'react-native-router-flux';
import Fabric from 'react-native-fabric';
import MainToolbar from '../../../components/MainToolbar';
import i18n from '../../../i18n/i18n.js';
import actions from '../../../actions/creators';
import {colors, metrics} from '../../../themes';
import {trackScreenView} from '../../../services/googleAnalytics';
import styles from '../../styles/selectionScreenStyle';

const {Answers} = Fabric;

class BehaviourScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        profile: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            visibleHeight: this.getScrollViewHeight(),
            behaviourFilter: ''
        };

        this.title = i18n.t('behaviour-title');
    }

    componentWillMount() {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentDidMount() {
        trackScreenView(this.title);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    getScrollViewHeight = () => {
        return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight - metrics.tabBarHeight;
    }

    handleBack = () => {
        NavActions.pop();
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

    onBehaviourSelect = (behaviour) => {
        const {dispatch} = this.props;
        dispatch(actions.getBehaviour(behaviour, this.props.index));
        NavActions.pop();
    }

    render() {

        const behaviourLists = [];
        const behaviours = this.props.behaviours;
        behaviours.map((behaviour, index) => {
            behaviourLists.push(behaviour.name)
        })
        const rowHasChanged = (r1, r2) => r1.value !== r2.value;
        this.ds = new ListView.DataSource({rowHasChanged});
        behaviourDataSource = this.ds.cloneWithRows(behaviourLists);

        return (
            <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
                <MainToolbar title={this.title} leftButton={{text: i18n.t('mainToolbar-back'), onPress: this.handleBack}}/>
                <ScrollView
                    contentContainerStyle={{paddingBottom: metrics.scrollViewPaddingBottom}}
                    style={[styles.scrollView, {height: this.state.visibleHeight}]}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="none"
                >
                    <View style={styles.selectionHeaderContainer}>
                        <Text style={styles.selectionText}>{i18n.t('behaviour-title')}</Text>
                    </View>
                    <ListView
                        dataSource={behaviourDataSource}
                        renderRow={behaviour => {
                            return (
                                <TouchableHighlight
                                    underlayColor={colors.lightGrey}
                                    onPress={() => this.onBehaviourSelect(behaviour)}>
                                    <View style={styles.itemListRow}>
                                        <Text style={styles.itemListRowText}>{behaviour}</Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    behaviours: state.behaviour.behavioursData  
  }
};

export default connect(mapStateToProps)(BehaviourScreen);
