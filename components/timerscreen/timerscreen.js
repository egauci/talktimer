import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {millisecondsToHhmmss} from '../../utils';
import Button from '../button';

const timerHeight = 80;
const buttonBarHeight = 60;

class TimerScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.updateNow = this.updateNow.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.state = {now: Date.now()};
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    setPaused: PropTypes.func.isRequired,
    setRunning: PropTypes.func.isRequired,
    winsize: PropTypes.object.isRequired
  }
  updateNow() {
    this.setState({now: Date.now()});
  }
  componentDidMount() {
    this.interval = setInterval(this.updateNow, 200);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }
  handleStopClick() {
    this.props.setRunning(false);
    this.props.navigator.jumpBack(0);
  }
  handlePauseClick() {
    const paused = this.props.data.get('paused');
    this.props.setPaused(!paused);
  }
  render() {
    const {height, width} = this.props.winsize.toJS();
    const {minimumTime, maximumTime, warnTime, paused, startTime, pausedTime, startPaused} = this.props.data.toJS();
    const pixels = height - timerHeight - buttonBarHeight;
    const minimumTop = pixels - Math.round(minimumTime / maximumTime * pixels) + timerHeight;
    const warnTop = pixels - Math.round(warnTime / maximumTime * pixels) + timerHeight;
    let elapsed = this.state.now - startTime - pausedTime;
    if (paused) {
      elapsed -= (this.state.now - startPaused);
    }
    let elapsedBarColor;
    if (elapsed >= maximumTime) {
      elapsedBarColor = 'red';
    } else if (elapsed >= warnTime) {
      elapsedBarColor = 'darkorange';
    } else if (elapsed >= minimumTime) {
      elapsedBarColor = 'green';
    } else {
      elapsedBarColor = 'lightgray';
    }
    const elapsedBarHeight = Math.floor(Math.min(elapsed, maximumTime) / maximumTime * pixels);
    const elapsedBarTop = pixels - elapsedBarHeight + timerHeight;
    const showWarnLine = () => {
      if (warnTime < maximumTime) {
        return <View style={[styles.warnLine, {top: warnTop, width}]} />;
      }
      return null;
    };
    const showMinimumLine = () => {
      if (minimumTime > 0) {
        return <View style={[styles.minimumLine, {top: minimumTop, width}]} />;
      }
      return null;
    };
    return (
      <View style={styles.container}>
        <View style={[styles.timerbar, {width}]}>
          <Text style={styles.timertext}>
            {millisecondsToHhmmss(elapsed)}
          </Text>
        </View>
        <View style={[styles.buttonBar, {top: height - buttonBarHeight, width}]}>
          <Button onClick={this.handleStopClick}
            disabled={!paused}
            type="secondary"
            height={40}
            width={100}
            text={'Stop'}
          />
          <Button onClick={this.handlePauseClick}
            type="primary"
            height={40}
            width={100}
            text={paused ? 'Resume' : 'Pause'}
          />
        </View>
        {showMinimumLine()}
        {showWarnLine()}
        <View style={[styles.elapsedBar, {
          width: width - 20, top: elapsedBarTop, height: elapsedBarHeight, backgroundColor: elapsedBarColor}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cornsilk'
  },
  minimumLine: {
    position: 'absolute',
    left: 0,
    height: 2,
    backgroundColor: 'green'
  },
  warnLine: {
    position: 'absolute',
    left: 0,
    height: 2,
    backgroundColor: 'darkorange'
  },
  elapsedBar: {
    position: 'absolute',
    left: 10,
    borderWidth: 1,
    borderColor: '#888888',
    borderBottomWidth: 0,
    shadowColor: 'darkgray',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.7,
    shadowRadius: 3
  },
  timerbar: {
    position: 'absolute',
    height: timerHeight,
    justifyContent: 'flex-end',
    paddingBottom: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'red'
  },
  timertext: {
    fontSize: 50,
    fontFamily: 'Helvetica Neue',
    color: '#555555'
  },
  buttonBar: {
    position: 'absolute',
    height: buttonBarHeight,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    left: 0
  }
});

export default TimerScreen;
