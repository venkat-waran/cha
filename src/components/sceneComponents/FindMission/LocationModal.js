import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { typography, colors, Custompadding } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import { GetIcon } from '../../../utils/Icons';
import Input from '../../common/CustomTextField';
const LocationModal = (props) => (
  <>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <TouchableOpacity onPress={props.closeCallback}>
        {GetIcon('chevron-down|Feather', colors.black, wp(6))}
      </TouchableOpacity>
      <Title
        style={[
          typography.bold.h4,
          {
            marginBottom: wp(2),
            textTransform: 'capitalize',
            textAlign: 'center',
            marginLeft: wp(25),
          },
        ]}
      >
        location
      </Title>
    </View>
    <View
      style={{
        marginVertical: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ width: wp(75) }}>
        <Input isSearchInput text="Search by country, state, zipcode" />
      </View>
      <TouchableOpacity
        style={[
          Custompadding.paddingBottomSmall,
          {
            alignItems: 'flex-end',
          },
        ]}
      >
        <Text style={[typography.regular.h6, { color: colors.black }]}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  </>
);
LocationModal.propTypes = {
  closeCallback: PropTypes.func,
};
export default LocationModal;
const Title = styled.Text``;
