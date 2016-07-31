import React, {PropTypes} from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';

const Button = ({width, height, text, onClick, type, disabled}) => {
  return (
    <TouchableHighlight
      style={[styles.button, styles[type], {height, width}, {opacity: disabled ? 0.5 : 1}]}
      onPress={onClick}
      underlayColor={underlays[type]}
      activeOpacity={0.6}
      disabled={disabled}
    >
      <Text style={styles.text}
      >{text}</Text>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  width: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'blue'
  },
  secondary: {
    backgroundColor: 'gray'
  },
  button: {
    borderColor: '#666666',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white'
  }
});

const underlays = {
  primary: 'darkblue',
  secondary: 'darkgray'
};

export default Button;
