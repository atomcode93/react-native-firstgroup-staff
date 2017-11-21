import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight} from 'react-native';
import DatePicker from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-modal-datetime-picker';
import i18n from '../i18n/i18n.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../themes';
import styles from './styles/datetimeItemStyle';

class DatetimeItem extends Component {
    
    constructor(props) {

        super(props);

        this.state={
            label: i18n.t('datetime-text'),
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            pickedDate: '',
            pickedTime: ''
        }
    }

    _confirmDate = (date) => {
        this.setState({
            isDatePickerVisible: false,
            pickedDate: date
        });
        this.props.onConfirmDate(date, this.props.index);
    }

    _confirmTime = (time) => {
        this.setState({
            isTimePickerVisible: false,
            pickedTime: time
        });
        this.props.onConfirmTime(time, this.props.index);
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
        
        let amPm = '';

        if (date) {
            if (date < 10)
            date = '0' + date;
            else
                date = date;
        }
        
        if (month) {
            if (month === 0)
                month = 'Jan'
            else if (month === 1)
                month = 'Feb'
            else if (month === 2)
                month = 'Mar'
            else if (month === 3)
                month = 'Apr'
            else if (month === 4)
                month = 'May'
            else if (month === 5)
                month = 'Jun'
            else if (month === 6)
                month = 'Jul'
            else if (month === 7)
                month = 'Aug'
            else if (month === 8)
                month = 'Sep'
            else if (month === 9)
                month = 'Oct'
            else if (month === 10)
                month = 'Nov'
            else  
                month = 'Dec'
        }
        
        if (year) {
            if (year >= 100) {
                year = year - 100;
                if (year < 10)
                    year = '0' + year;
            }
            else
                year = year
        }
        
        if (hour) {
            if (hour < 12) {
                if (hour < 10) {
                    hour = '0' + hour;
                    amPm = 'AM';
                }
                else {
                    hour = hour;
                    amPm = 'AM';
                }
            }
            else if (hour === 12) {
                hour = 12;
                amPm = 'PM';
            }
            else {
                hour = hour - 12;
                if (hour < 10) {
                    hour = '0' + hour;
                }
                else {
                    hour = hour;
                }
                amPm = 'PM';
            }
        }
        
        if (minute) {
            if (minute < 10) {
                minute = '0' + minute;
            }
            else {
                minute = minute;
            }
        }

        const datetimeObj = {
            date: date,
            month: month,
            year: year,
            hour: hour,
            minute: minute,
            amPm: amPm
        }
        return datetimeObj;
    }

    onShowDatePicker = () => {
        this.setState({isDatePickerVisible: true})
    }

    onHideDatePicker = () => {
        this.setState({isDatePickerVisible: false})
    }

    onShowTimePicker = () => {
        this.setState({isTimePickerVisible: true})
    }

    onHideTimePicker = () => {
        this.setState({isTimePickerVisible: false})
    }

    render() {

        const {pickedDate, pickedTime, isDatePickerVisible, isTimePickerVisible} = this.state;
        const datetimeObj = this.combineDatetime(pickedDate, pickedTime);

        let date = datetimeObj.date;
        let month = datetimeObj.month;
        let year = datetimeObj.year;
        let hour = datetimeObj.hour;
        let minute = datetimeObj.minute;
        let amPm = datetimeObj.amPm;

        let dateText, timeText, amPmText = '';

        if (date && month && year)
            dateText = datetimeObj.date + '-' + datetimeObj.month + '-' + datetimeObj.year;
        if (hour && minute)
            timeText = datetimeObj.hour + ':' + datetimeObj.minute;
        if (amPm)
            amPmText = datetimeObj.amPm;
        
        return (
            <View>
                <View style={styles.datetimeItemContainer}>
                    <View style={styles.datetimeItemLabelContainer}>
                        <Text style={styles.datetimeItemLabelText}>{this.state.label}</Text>
                    </View>
                    <View style={styles.datetimeControlView}>
                        <View style={styles.datetimeTextView}>
                            <Text style={styles.datetimeText}>{dateText}</Text>
                            <Text style={styles.datetimeText}>{timeText}</Text>
                            <Text style={styles.datetimeText}>{amPmText}</Text>
                        </View>
                        <View style={styles.datetimeIcon}>
                            <TouchableHighlight onPress={this.onShowDatePicker}>
                                <Icon name="calendar" size={15} color={colors.darkerGrey}/>
                            </TouchableHighlight>
                            <DatePicker
                                mode='date'
                                isVisible={isDatePickerVisible}
                                onConfirm={(date) => this._confirmDate(date)}
                                onCancel={this.onHideDatePicker}
                            />
                            <TouchableHighlight onPress={this.onShowTimePicker}>
                                <Icon name="clock-o" size={15} color={colors.darkerGrey}/>
                            </TouchableHighlight>
                            <TimePicker
                                mode='time'
                                titleIOS={i18n.t('timepicker-text')}
                                isVisible={isTimePickerVisible}          
                                onConfirm={(time) => this._confirmTime(time)}
                                onCancel={this.onHideTimePicker}
                            />
                        </View>
                    </View>
                </View>
                {this.props.error && <View style={styles.errorContainer}><Text style={styles.errorText}>{this.props.error}</Text></View>}
            </View>
        
        )
    } 
}

export default DatetimeItem;
