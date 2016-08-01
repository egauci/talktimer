import React, {
  Component,
  PropTypes} from 'react';
import {
  View,
  Text,
  TextInput,
  Slider,
  StyleSheet
} from 'react-native';
import Button from '../button';

class SetupScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.totalChanged = this.totalChanged.bind(this);
    this.runButtonClickHandler = this.runButtonClickHandler.bind(this);
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
  render() {
    const data = this.props.data.toJS();
    const maxTime = Math.floor(data.maximumTime / 60000);
    const minTime = Math.floor(data.minimumTime / 60000);
    const warnTime = Math.floor(data.warnTime / 60000);
    return (
      <View
        style={styles.compContainer}
      >
        <View style={styles.inputContainer}>
          <Text style={[styles.inputs, styles.inputsText]}>Total Time (minutes)</Text>
          <TextInput
            multiline={false}
            onChangeText={this.totalChanged}
            value={maxTime === 0 ? '' : String(maxTime)}
            keyBoardType="numeric"
            style={[styles.inputs, styles.numInput]}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputs, styles.inputsText]}>Minimum Time</Text>
          <Slider
            disabled={maxTime === 0}
            minimumValue={0}
            maximumValue={maxTime ? maxTime : 1}
            onValueChange={this.props.setMinTime}
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
            onValueChange={this.props.setWarnTime}
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
    backgroundColor: '#E0FFE0',
    paddingTop: 40
  },
  compContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

export default SetupScreen;
