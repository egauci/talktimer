import {connect} from 'react-redux';
import {setRunning, setPaused} from '../../actions';
import TimerScreen from './timerscreen';

const mapStateToProps = state => ({
  data: state.get('data'),
  winsize: state.get('winsize')
});

export default connect(mapStateToProps, {setRunning, setPaused})(TimerScreen);
