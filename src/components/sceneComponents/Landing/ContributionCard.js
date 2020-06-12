import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Progress from 'react-native-progress';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, typography, Custompadding } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import { GetIcon } from '../../../utils/Icons';
const ContributionCard = ({ cardData, contributionCallback, cardCallBack }) => (
  <TouchableOpacity onPress={cardCallBack}>
    {cardData &&
      cardData.length &&
      cardData.map((item) => (
        <View
          style={{
            borderColor: colors.GREYS.C4,
            borderWidth: 1,
            borderRadius: 25,
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 8,
            // elevation: 10,
            paddingVertical: wp(2),
            marginBottom: wp(4),
          }}
        >
          <ImageBanner
            style={{
              height: wp(61),
              width: wp(100),
              marginBottom: wp(5.33),
            }}
          >
            <Image
              source={item.image}
              alt="puppy"
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                // borderTopLeftRadius: 22,
                // borderTopRightRadius: 22,
                // borderBottomLeftRadius: 0,
                // borderBottomRightRadius: 0,
              }}
            />
          </ImageBanner>
          <View style={[Custompadding.paddingLeftRightLarge]}>
            <Heading style={[Custompadding.paddingBottomRegular]}>
              <Text
                style={[
                  typography.bold.h4,
                  { color: colors.GREYS.C8, textTransform: 'uppercase' },
                ]}
              >
                {item.name}
              </Text>
              {GetIcon('wrench|FontAwesome5', colors.GREYS.C8, wp(3.73))}
            </Heading>
            <View
              style={[
                Custompadding.paddingBottomLarge,
                { flexDirection: 'row' },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: wp(9.6),
                }}
              >
                <Text
                  style={[
                    typography.bold.h7,
                    { color: colors.GREYS.C8, marginRight: wp(1) },
                  ]}
                >
                  {item.totalFund}
                </Text>
                <Text
                  style={[
                    typography.regular.h7,
                    { color: colors.GREYS.C8, textTransform: 'uppercase' },
                  ]}
                >
                  YTD
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: wp(9.6),
                }}
              >
                <Text
                  style={[
                    typography.bold.h7,
                    { color: colors.GREYS.C8, marginRight: wp(1) },
                  ]}
                >
                  {item.monthlyFund}
                </Text>
                <Text
                  style={[
                    typography.regular.h7,
                    { color: colors.GREYS.C8, textTransform: 'uppercase' },
                  ]}
                >
                  month to date
                </Text>
              </View>
            </View>
            <Progress.Bar
              progress={0.7}
              width={wp(88)}
              height={wp(1.86)}
              color={colors.GREEN.C1}
              unfilledColor={colors.GREYS.C7}
              borderWidth={1}
              borderColor={colors.GREYS.C7}
              borderRadius={12}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: wp(1.4),
                alignItems: 'center',
              }}
            >
              <Text style={[typography.regular.h6]}>{item.pendingFund}</Text>
              <Text style={[typography.regular.h8]}>until next milestone:</Text>
              <Text style={[typography.bold.h8]}>{item.vacancy} Vaccines</Text>
            </View>
            <ContributionWrapper
              onPress={contributionCallback}
              style={[Custompadding.paddingLarge, { marginTop: wp(6.66) }]}
            >
              <View
                style={[
                  Custompadding.paddingBottomXLarge,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                ]}
              >
                <Text
                  style={[typography.bold.h6, { textTransform: 'capitalize' }]}
                >
                  Your Contribution
                </Text>
                <Text
                  style={[
                    typography.regular.h6,
                    { color: colors.GREYS.C10, textTransform: 'capitalize' },
                  ]}
                >
                  Round-Ups,{item.roundupAmount}
                </Text>
                {GetIcon(
                  'chevron-right|FontAwesome5',
                  colors.GREYS.C8,
                  wp(3.73),
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ marginRight: wp(14.93) }}>
                  <Text
                    style={[typography.bold.h4, { color: colors.GREYS.C8 }]}
                  >
                    $10
                  </Text>
                  <Text
                    style={[typography.regular.h7, { color: colors.GREYS.C8 }]}
                  >
                    Month to Date
                  </Text>
                </View>
                <View>
                  <Text
                    style={[typography.bold.h4, { color: colors.GREYS.C8 }]}
                  >
                    $30
                  </Text>
                  <Text
                    style={[
                      typography.regular.h7,
                      { color: colors.GREYS.C8, textTransform: 'uppercase' },
                    ]}
                  >
                    ytd
                  </Text>
                </View>
              </View>
            </ContributionWrapper>
          </View>
        </View>
      ))}
  </TouchableOpacity>
);
ContributionCard.propTypes = {
  cardData: PropTypes.array,
  contributionCallback: PropTypes.func,
  cardCallBack: PropTypes.func,
};
export default ContributionCard;
const ImageBanner = styled.View`
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
`;
const Heading = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContributionWrapper = styled.TouchableOpacity`
  background-color: ${colors.GREYS.C5};
  border-radius: 15px;
`;
