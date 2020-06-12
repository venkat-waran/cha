import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { typography, colors, Custompadding } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import { GetIcon } from '../../../utils/Icons';
const EditModal = ({ onEditMission }) => (
  <>
    <View>
      <Title
        style={[
          typography.bold.h3,
          {
            marginBottom: wp(2),
            textTransform: 'capitalize',
            textAlign: 'center',
          },
        ]}
      >
        edit mission
      </Title>
    </View>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('Mission')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.BLUES.C4,
          },
        ]}
      >
        preview
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('About')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.BLUES.C4,
          },
        ]}
      >
        about
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('Social')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.BLUES.C4,
          },
        ]}
      >
        social
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('Content')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.BLUES.C4,
          },
        ]}
      >
        media
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('Milestone')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.BLUES.C4,
          },
        ]}
      >
        milestones
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        Custompadding.paddingTopBottomRegular,
        { flexDirection: 'row', justifyContent: 'space-between' },
      ]}
      onPress={() => onEditMission('endMission')}
    >
      <Text
        style={[
          typography.regular.h4,
          {
            textTransform: 'capitalize',
            // textAlign: 'center',
            color: colors.error,
          },
        ]}
      >
        end mission
      </Text>
      <Text>
        {GetIcon('chevron-right|FontAwesome5', colors.black, wp(2.64))}
      </Text>
    </TouchableOpacity>
  </>
);
EditModal.propTypes = {
  onEditMission: PropTypes.func,
};
export default EditModal;
const Title = styled.Text``;
