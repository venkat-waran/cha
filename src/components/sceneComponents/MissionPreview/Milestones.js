import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { wp } from '../../../utils/Dimensions';
import { typography, colors, Custompadding } from '../../../styles/styleSheet';
import { GetIcon } from '../../../utils/Icons';

const Milestones = ({ icon, title, subTitle, desc, color }) => (
  <View>
    <View
      style={{
        height: wp(1),
        width: '100%',
        backgroundColor: color,
        marginTop: wp(16),
        position: 'relative',
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: wp(-2.64),
          height: wp(6.66),
          width: wp(6.66),
          backgroundColor: color,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        {GetIcon(icon, colors.white, wp(4))}
      </TouchableOpacity>
    </View>
    <Wrapper
      style={{
        height: wp(72),
        width: wp(90),
        alignItems: 'center',
      }}
    >
      <Text
        style={[
          typography.bold.h6,
          Custompadding.paddingBottomSmall,
          { textTransform: 'capitalize', textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          typography.bold.h7,
          Custompadding.paddingBottomSmall,

          {
            color,
            textTransform: 'uppercase',
            textAlign: 'center',
          },
        ]}
      >
        {subTitle}
      </Text>
      <Text style={[typography.regular.h6, { textAlign: 'center' }]}>
        {desc}
      </Text>
    </Wrapper>
  </View>
);
Milestones.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  desc: PropTypes.string,
  color: PropTypes.string,
};
export default Milestones;
const Wrapper = styled.View`
  border-radius: 2px;
  justify-content: center;
`;
