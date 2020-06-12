import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { wp } from '../../../utils/Dimensions';
import { Custompadding, typography, colors } from '../../../styles/styleSheet';
import { GetIcon } from '../../../utils/Icons';

const MissionCard = ({ menu }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}
  >
    {menu.map((item) => (
      <Wrapper style={{ width: wp(44), marginBottom: wp(5.33) }}>
        <TouchableOpacity onPress={item.onPress}>
          <View>
            <View
              style={{
                height: wp(28),
                width: wp(43),
                position: 'relative',
              }}
            >
              <Image
                source={item.icon}
                alt="group-image"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            {item.tag && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 6,
                  right: 6,
                  height: wp(6.66),
                  width: wp(6.66),
                  backgroundColor: colors.GREEN.C2,
                  borderRadius: 100,
                  borderColor: colors.white,
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: wp(1.86),
                    color: colors.white,
                    textAlign: 'center',
                    paddingVertical: wp(1.67),
                  }}
                >
                  503 1c
                </Text>
              </View>
            )}
          </View>
          <View style={[Custompadding.paddingSmall]}>
            <Text
              numberOfLines={1}
              style={[typography.bold.h6, { textTransform: 'capitalize' }]}
            >
              {item.missionName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: wp(2.64),
                marginBottom: wp(1),
              }}
            >
              <Text style={[typography.bold.h9, { color: colors.GREEN.C2 }]}>
                {item.amount}
              </Text>
              <Text style={[typography.bold.h9, { paddingHorizontal: wp(1) }]}>
                to
              </Text>
              <Text style={[typography.bold.h9, { color: colors.GREYS.C8 }]}>
                {item.doner}
              </Text>
            </View>
            <View style={{ marginBottom: wp(4) }}>
              <Progress.Bar
                progress={0.7}
                width={wp(36)}
                height={wp(1.87)}
                color={colors.GREEN.C1}
                unfilledColor={colors.GREYS.C7}
                borderWidth={1}
                borderColor={colors.GREYS.C7}
                borderRadius={7}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[typography.bold.h7]}>40</Text>
                <Text>{GetIcon('user|Feather', colors.black, wp(3.4))}</Text>
              </View>
              <Text style={[typography.bold.h8, { color: colors.GREYS.C9 }]}>
                $6,770 YTD
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Wrapper>
    ))}
  </View>
);
MissionCard.propTypes = {
  menu: PropTypes.array,
};
export default MissionCard;
const Wrapper = styled.View`
  border: 3px solid ${colors.background};
  border-radius: 8px;
  background-color: ${colors.white};
`;
