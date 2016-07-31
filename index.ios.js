/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text,
  // View,
  Navigator
} from 'react-native';

import Immutable from 'immutable';
import {Provider} from 'react-redux';
import {createStore/* , applyMiddleware, compose*/} from 'redux';
import reducer from './reducers';
import SetupScreen from './components/setupscreen';
import TimerScreen from './components/timerscreen';
import {setupWinsize, stopWinsize} from './utils';

// const createStoreWithMiddleware =
//   compose(
//     applyMiddleware(),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )(createStore);
// let store = createStoreWithMiddleware(reducer, Immutable.Map());

const store = createStore(reducer, Immutable.Map());

class TalkTimer extends Component {
  constructor(props, context) {
    super(props, context);
    this.routes = [
      {index: 0, component: SetupScreen},
      {index: 1, component: TimerScreen}
    ];
    this.renderScene = this.renderScene.bind(this);
  }
  renderScene(route, navigator) {
    return (
      <route.component navigator={navigator} />
    );
  }
  componentDidMount() {
    setupWinsize(store);
  }
  componentWillUnmount() {
    stopWinsize();
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={this.routes[0]}
          initialRouteStack={this.routes}
          renderScene={this.renderScene}
          style={styles.container}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE0E0'
  }
});

AppRegistry.registerComponent('TalkTimer', () => TalkTimer);
