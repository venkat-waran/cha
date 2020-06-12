import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
// import { wp } from '../../utils/Dimensions';
import { map } from 'lodash';
import styled from 'styled-components';
import { colors, Custompadding, typography } from '../../styles/styleSheet';

const TabItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 11px 10.5px;
  align-items: center;
  align-self: flex-start;
  border-radius: 4px;
`;

const Tabs = ({ details, onTabClick, activeTab }) => {
  const handleTabClick = (clickedTab) => {
    if (onTabClick) onTabClick(clickedTab);
  };
  return (
    <View
      style={[
        {
          backgroundColor: 'transparent',
          borderBottomColor: colors.borderColor,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View
        style={[
          Custompadding.paddingSmall,
          {
            // height: wp(77.8),
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: colors.white,
          },
        ]}
      >
        {map(details, (detail) => (
          <TabItem
            active={detail.key === activeTab}
            key={detail.value}
            onPress={() => handleTabClick(detail)}
          >
            {/* {detail.key === activeTab &&
                  GetIcon(
                    customIcon,
                    colors.secondaryColor,
                    detail.fontSize ? detail.fontSize : wp(4),
                  )} */}
            <Text
              style={[
                detail.key === activeTab
                  ? typography.bold.h6
                  : typography.regular.h6,
                {
                  color:
                    detail.key === activeTab ? colors.black : colors.tabText,
                  paddingLeft: detail.key === activeTab ? 10 : 0,
                  textTransform: 'capitalize',
                },
              ]}
            >
              {detail.value}
            </Text>
          </TabItem>
        ))}
      </View>
    </View>
  );
};

Tabs.propTypes = {
  details: PropTypes.array,
  onTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tabs;
