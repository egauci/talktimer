import {Dimensions} from 'react-native';
import {setDimensions} from '../actions';

let store;
let interval;

let curWidth = 0;
let curHeight = 0;

const updateSize = () => {
  const {height, width} = Dimensions.get('window');
  if (height !== curHeight) {
    curWidth = width;
    curHeight = height;
    store.dispatch(setDimensions(curWidth, curHeight));
  }
};

export const setupWinsize = newStore => {
  if (store) {
    return;
  }
  store = newStore;
  interval = setInterval(updateSize, 250);
};

export const stopWinsize = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};
