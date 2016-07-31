import {connect} from 'react-redux';
import SetupScreen from './setupscreen.js';
import {setMaxTime, setMinTime, setWarnTime, setRunning} from '../../actions';

const mapStateToProps = state => ({
  data: state.get('data')
});

export default connect(mapStateToProps, {
  setMaxTime, setMinTime, setWarnTime, setRunning})(SetupScreen);
