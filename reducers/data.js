import Immutable from 'immutable';

const initState = Immutable.fromJS({
  running: false,
  paused: false,
  startTime: 0,
  startPaused: 0,
  pausedTime: 0,
  maximumTime: 0,
  minimumTime: 0,
  warnTime: 0
});

const data = (state = initState, action) => {
  let newState;
  switch (action.type) {
  case 'SET_MAX_TIME':
    const currentMaxTime = state.get('maximumTime');
    newState = state.set('maximumTime', action.payload);
    newState = newState.set('minimumTime', Math.min(action.payload, newState.get('minimumTime')));
    let warnTime = newState.get('warnTime');
    warnTime = warnTime === currentMaxTime ? action.payload : warnTime;
    warnTime = Math.min(warnTime, action.payload);
    warnTime = Math.max(warnTime, newState.get('minimumTime'));
    return newState.set('warnTime', warnTime);
  case 'SET_RUNNING':
    const running = action.payload;
    newState = state.set('running', running);
    if (running) {
      newState = newState.set('startPaused', 0);
      newState = newState.set('pausedTime', 0);
      newState = newState.set('paused', false);
      return newState.set('startTime', Date.now());
    }
    return newState;
  case 'SET_PAUSED':
    const paused = action.payload !== undefined ? action.payload : !state.get('paused');
    newState = state.set('paused', paused);
    if (paused) {
      return newState.set('startPaused', Date.now());
    }
    const pausedPeriod = Date.now() - newState.get('startPaused');
    newState = newState.set('startPaused', 0);
    return newState.set('pausedTime', newState.get('pausedTime') + pausedPeriod);
  case 'SET_MIN_TIME':
    newState = state.set('minimumTime', action.payload);
    warnTime = Math.max(newState.get('warnTime'), action.payload);
    return newState.set('warnTime', warnTime);
  case 'SET_WARN_TIME':
    return state.set('warnTime', action.payload);
  default:
    return state;
  }
};

export default data;
