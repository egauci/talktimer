import Immutable from 'immutable';

const initState = Immutable.fromJS({
  width: 0,
  height: 0
});

const winsize = (state = initState, action) => {
  if (action.type === 'SET_DIMENSIONS') {
    return Immutable.fromJS({width: action.payload.width, height: action.payload.height});
  }
  return state;
};

export default winsize;
