import React, {
  Component,
  PropTypes} from 'react';
import {
  View,
  Text,
  TextInput,
  Slider,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import Button from '../button';

const {State: TextInputState} = TextInput;

const dismissKeyboard = () => {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
};

class SetupScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.totalChanged = this.totalChanged.bind(this);
    this.runButtonClickHandler = this.runButtonClickHandler.bind(this);
    this.handleWarnChange = this.handleWarnChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    setMaxTime: PropTypes.func.isRequired,
    setMinTime: PropTypes.func.isRequired,
    setRunning: PropTypes.func.isRequired,
    setWarnTime: PropTypes.func.isRequired
  };
  runButtonClickHandler() {
    this.props.setRunning(true);
    this.props.navigator.jumpForward(0);
  }
  cleanNumber(numb) {
    return numb.replace(/[^\d]/g, '');
  }
  totalChanged(total) {
    this.props.setMaxTime(this.cleanNumber(total));
  }
  handleWarnChange(time) {
    dismissKeyboard();
    this.props.setWarnTime(time);
  }
  handleMinChange(time) {
    dismissKeyboard();
    this.props.setMinTime(time);
  }
  render() {
    const data = this.props.data.toJS();
    const maxTime = Math.round(data.maximumTime / 60000);
    const minTime = Math.round(data.minimumTime / 60000);
    const warnTime = Math.round(data.warnTime / 60000);
    return (
      <View
        style={styles.compContainer}
      >
        <View style={[styles.inputContainer, {flex: 0.2}]}>
          <Text style={[styles.inputs, styles.inputsText]}>Total Time (minutes)</Text>
          <TextInput
            multiline={false}
            onChangeText={this.totalChanged}
            value={maxTime === 0 ? '' : String(maxTime)}
            keyboardType="numeric"
            style={[styles.inputs, styles.numInput]}
          />
        </View>
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.withoutfeedback}>
          <View style={{flex: 1}}>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputs, styles.inputsText]}>Minimum Time</Text>
              <Slider
                disabled={maxTime === 0}
                minimumValue={0}
                maximumValue={maxTime ? maxTime : 1}
                onValueChange={this.handleMinChange}
                step={1}
                value={minTime}
                style={[styles.inputs, styles.sliderInput]}
              />
              <Text style={[styles.inputs, styles.inputsText]}>{minTime}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.inputs, styles.inputsText]}>Warning Time</Text>
              <Slider
                disabled={maxTime === 0}
                minimumValue={minTime ? minTime : 0}
                maximumValue={maxTime ? maxTime : 1}
                onValueChange={this.handleWarnChange}
                step={1}
                value={warnTime}
                style={[styles.inputs, styles.sliderInput]}
              />
              <Text style={[styles.inputs, styles.inputsText]}>{warnTime}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Button height={40} width={100} type="primary" text="Start"
                disabled={maxTime === 0}
                onClick={this.runButtonClickHandler} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 5
  },
  inputsText: {
    fontSize: 14
  },
  numInput: {
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginRight: 10,
    fontSize: 14
  },
  sliderInput: {
    flex: 1
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'linen',
    paddingTop: 40
  },
  withoutfeedback: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  compContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

export default SetupScreen;
