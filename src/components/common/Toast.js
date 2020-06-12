/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
const ToastContainer = React.forwardRef(
  (
    {
      position,
      positionValue,
      fadeOutDuration,
      fadeInDuration,
      color,
      // backgroundColor,
    },
    ref,
  ) => (
    <Toast
      ref={ref}
      style={{
        // backgroundColor: backgroundColor || 'red',
        position: 'absolute',
        right: 10,
      }}
      position={position || 'top'}
      positionValue={positionValue || 60}
      fadeOutDuration={fadeOutDuration}
      fadeInDuration={fadeInDuration}
      textStyle={{ color: color || 'white' }}
    />
  ),
);

ToastContainer.propTypes = {
  position: PropTypes.string,
  positionValue: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  fadeInDuration: PropTypes.number,
  color: PropTypes.string,
  // backgroundColor: PropTypes.string,
};
export default ToastContainer;
