import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { colors, Custompadding, typography } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import EmptyState from '../../common/EmptyState';

const MilestoneList = ({ milestoneList = [] }) => (
  <>
    {milestoneList.length ? (
      milestoneList.map((milestone, index) => (
        <View
          style={[
            Custompadding.paddingLeftRightLarge,
            Custompadding.paddingTopBottomXLarge,
            { borderWidth: 1, borderColor: colors.GREYS.C7 },
          ]}
          key={milestone.id || index}
        >
          <View
            style={[
              Custompadding.paddingBottomSmall,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: colors.GREYS.C7,
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[typography.regular.h6]}>{`${index + 1})`}</Text>
              <Title style={[typography.regular.h6, { marginLeft: wp(1.5) }]}>
                {milestone.title}
              </Title>
            </View>
            <Fund
              style={[typography.regular.h6]}
            >{`$${milestone.amount}`}</Fund>
          </View>
          <Desc style={[typography.regular.h6, Custompadding.paddingTopSmall]}>
            {milestone.description}
          </Desc>
        </View>
      ))
    ) : (
      <EmptyState message="No Milestones found" />
    )}
  </>
);

MilestoneList.propTypes = {
  milestoneList: PropTypes.array,
};

export default MilestoneList;
const Title = styled.Text`
  text-transform: capitalize;
`;
const Fund = styled.Text``;
const Desc = styled.Text`
  text-transform: capitalize;
`;
