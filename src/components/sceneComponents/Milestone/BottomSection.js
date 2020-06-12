import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { colors, Custompadding, typography } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';

const BottomSection = ({
  onCreateMilestone,
  onDeleteMilestone,
  showRemove,
}) => (
  <>
    <View
      style={[
        Custompadding.paddingTopBottomXLarge,
        {
          backgroundColor: colors.secondaryBackgroundColor,
        },
      ]}
    >
      {showRemove ? (
        <CustomButton
          onPress={onDeleteMilestone}
          style={[
            Custompadding.paddingTopBottomRegular,
            Custompadding.paddingLeftRightLarge,
            { marginBottom: wp(4), width: wp(70) },
          ]}
        >
          <Text
            style={[
              typography.regular.h6,
              { color: colors.white, textTransform: 'capitalize' },
            ]}
          >
            Remove Last Milestone
          </Text>
        </CustomButton>
      ) : null}
      <CustomButton
        onPress={onCreateMilestone}
        style={[
          Custompadding.paddingTopBottomRegular,
          Custompadding.paddingLeftRightLarge,
          { width: wp(70) },
        ]}
      >
        <Text
          style={[
            typography.regular.h6,
            { color: colors.white, textTransform: 'capitalize' },
          ]}
        >
          add Milestone
        </Text>
      </CustomButton>
    </View>
  </>
);

BottomSection.propTypes = {
  showRemove: PropTypes.bool,
  onCreateMilestone: PropTypes.func,
  onDeleteMilestone: PropTypes.func,
};

export default BottomSection;
const CustomButton = styled.TouchableOpacity`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
