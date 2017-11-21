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
  TextInput,
  findNodeHandle
} from 'react-native';

import {connect} from 'react-redux';
import {get} from 'lodash';
import TextInputState from 'TextInputState';
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

class LocationScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        profile: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            visibleHeight: this.getScrollViewHeight(),
            locationFilter: ''
        };

        this.title = i18n.t('location-title');
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

    getNodeHandle() {
        return findNodeHandle(this.refs.filter);
    }

    getScrollViewHeight = () => {
        return metrics.screenHeight - metrics.mainToolbarHeight - metrics.statusBarHeight;
    }

    handleCapture = (e) => {
        const focusField = TextInputState.currentlyFocusedField();
        const target = e.nativeEvent.target;
        if (focusField != null && target != focusField) {
          const {filter} = this.refs;
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

    onGetLocations = (text) => {
        this.setState({locationFilter: text});
        const {dispatch} = this.props;
        dispatch(actions.getLocations(text));
    }
    onLocationSelect = (selection) => {
        this.setState({locationFilter: selection});
        const locations = this.props.locations;
        locations.map((location, index) => {
            if (location.name === selection) {
                const {dispatch} = this.props;
                dispatch(actions.getLocation(location.id));
            }
        })
        NavActions.pop();
    }

    handleBack = () => {
        NavActions.pop();
    }

    render() {
        
        const locationLists = [];
        const locations = this.props.locations;
        locations.map((location, index) => {
            locationLists.push(location.name)
        })
        const rowHasChanged = (r1, r2) => r1.value !== r2.value;
        this.ds = new ListView.DataSource({rowHasChanged});
        locationDataSource = this.ds.cloneWithRows(locationLists);

        return (
            <View style={styles.mainContainer} onStartShouldSetResponderCapture={this.handleCapture}>
                <MainToolbar title={this.title} leftButton={{text: i18n.t('mainToolbar-back'), onPress: this.handleBack}}/>
                <ScrollView
                    contentContainerStyle={{paddingBottom: metrics.scrollViewPaddingBottom}}
                    style={[styles.scrollView, {height: this.state.visibleHeight}]}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="none"
                >
                    <View style={styles.filterView}>
                        <TextInput 
                            ref="filter"
                            style={styles.filterText}
                            editable={true}
                            autoCapitalize = "none"
                            onChangeText = {this.onGetLocations} 
                            value={this.state.locationFilter}/>
                    </View>
                    <View style={{flex: 1}}>
                        <ListView
                            dataSource={locationDataSource}
                            renderRow={selection => {
                                return (
                                    <TouchableHighlight
                                        underlayColor={colors.lightGrey}
                                        onPress={() => this.onLocationSelect(selection)}>
                                        <View style={styles.itemListRow}>
                                            <Text style={styles.itemListRowText}>{selection}</Text>
                                        </View>
                                    </TouchableHighlight>
                                );
                            }}
                        />
                    </View>        
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    locations: state.location.locationsData,
    profile: state.profile.profileData,
  }
};

export default connect(mapStateToProps)(LocationScreen);
