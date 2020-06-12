import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { wp } from '../../utils/Dimensions';
import { colors, typography } from '../../styles/styleSheet';

const EmptyState = ({ height, width, message }) => (
  <View
    style={{
      height: height || wp(100),
      width: width || wp(100),
      justifyContent: 'center',
    }}
  >
    <Text
      style={[
        typography.regular.h6,
        {
          color: colors.black,
          textTransform: 'capitalize',
          textAlign: 'center',
        },
      ]}
    >
      {message}
    </Text>
  </View>
);

EmptyState.propTypes = {
  message: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default EmptyState;
