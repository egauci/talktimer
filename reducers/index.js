import {combineReducers} from 'redux-immutable';
import data from './data';
import winsize from './winsize';

const reducer = combineReducers({
  data,
  winsize
});

export default reducer;
