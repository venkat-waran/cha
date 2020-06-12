/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import { View, TouchableOpacity, Text } from 'react-native';
import { wp } from '../../utils/Dimensions';
import { colors, typography } from '../../styles/styleSheet';
import { GetIcon } from '../../utils/Icons';

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.View`
  padding-left: 17px;
`;

export default class Header extends Component {
  render() {
    const {
      // searchCallback,
      // filterCallback,
      // icon3Callback,
      backCallback,
      rightHeading,
      successText,
      heading,
      noBack,
      textCallback,
      // icon1,
      // icon2,
      // icon3,
    } = this.props;
    return (
      <Flex>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: rightHeading
              ? 'space-between'
              : noBack
              ? 'center'
              : 'flex-start',
          }}
        >
          <View>
            {noBack ? null : (
              <TouchableOpacity onPress={backCallback}>
                {GetIcon('arrow-left|Feather', colors.black, wp(8))}
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginLeft: rightHeading ? 0 : wp(12) }}>
            {heading && (
              <Text
                style={[
                  typography.bold.h4,
                  {
                    lineHeight: wp(7.2),
                    textTransform: 'capitalize',
                  },
                ]}
              >
                {heading}
              </Text>
            )}
          </View>
          {rightHeading ? (
            <TouchableOpacity onPress={textCallback}>
              <Text
                style={[
                  typography.regular.h6,
                  {
                    color: successText ? colors.GREEN.C1 : colors.black,
                    lineHeight: wp(7.2),
                    textTransform: 'capitalize',
                  },
                ]}
              >
                {rightHeading}
              </Text>
              {/* <TouchableOpacity onPress={iconCallback}>
                {icon && <Icon>{GetIcon(icon, colors.iconColor, wp(6))}</Icon>}
              </TouchableOpacity> */}
            </TouchableOpacity>
          ) : null}
        </View>
      </Flex>
    );
  }
}
