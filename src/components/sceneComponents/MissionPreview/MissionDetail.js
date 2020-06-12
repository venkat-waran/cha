/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import member from '../../../assets/images/dummy-profile.png';
import facebook from '../../../assets/images/facebook.png';
import twitter from '../../../assets/images/twitter.png';
import instagram from '../../../assets/images/instagram.png';
// import puppy from '../../../assets/images/puppy.png';
import { colors, Custompadding, typography } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
// import { GetIcon } from '../../../utils/Icons';
const MissionDetails = ({ missionDetail, missionId }) => {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <Text
        style={[
          typography.bold.h2,
          {
            color: colors.GREYS.C8,
            textTransform: 'uppercase',
            lineHeight: wp(8.8),
          },
        ]}
      >
        {missionDetail.title}
      </Text>
      {/* <Text
      style={[
        typography.regular.h8,
        {
          color: colors.GREEN.C2,
          textTransform: 'capitalize',
          lineHeight: wp(3.73),
        },
      ]}
    >
      Verified 501 3c
    </Text> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {/* <Text style={[typography.bold.h4, { color: colors.GREYS.C8 }]}>
          @spca
        </Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {missionDetail && missionDetail.twitter_link ? (
            <View
              style={{
                height: wp(5.5),
                width: wp(5.5),
                borderRadius: 100,
                marginRight: wp(2.64),
              }}
            >
              <TouchableOpacity
                onPress={() => Linking.openURL(missionDetail.twitter_link)}
              >
                <Image
                  source={twitter}
                  alt="twitter"
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {missionDetail && missionDetail.facebook_link ? (
            <View
              style={{
                height: wp(5.5),
                width: wp(5.5),
                marginRight: wp(2.64),
              }}
            >
              <TouchableOpacity
                onPress={() => Linking.openURL(missionDetail.facebook_link)}
              >
                <Image
                  source={facebook}
                  alt="facebook"
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {missionDetail && missionDetail.insta_link ? (
            <View
              style={{
                height: wp(5.5),
                width: wp(5.5),
                borderRadius: 100,
                marginRight: wp(2.64),
              }}
            >
              <TouchableOpacity
                onPress={() => Linking.openURL(missionDetail.insta_link)}
              >
                <Image
                  source={instagram}
                  alt="instagram"
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {/* <Text
            style={[
              typography.bold.h6,
              { color: colors.GREYS.C8, marginRight: wp(2.64) },
            ]}
          >
            More
          </Text>
          <TouchableOpacity>
            {GetIcon('chevron-right|FontAwesome5', colors.GREYS.C8, wp(4))}
          </TouchableOpacity> */}
        </View>
      </View>
      {missionDetail.members && missionDetail.members.length ? (
        <MemberWrapper
          style={[
            Custompadding.paddingTopLarge,
            Custompadding.paddingLeftRightLarge,
            { marginBottom: wp(4), marginTop: wp(11) },
          ]}
        >
          <Text
            style={[
              Custompadding.paddingBottomXLarge,
              typography.bold.h4,
              {
                color: colors.GREYS.C8,
                lineHeight: wp(7.2),
                textAlign: 'center',
              },
            ]}
          >
            50 Members
          </Text>
          <MemberImageWrapper style={[Custompadding.paddingBottomXLarge]}>
            <MemberImage
              style={{
                height: wp(13.33),
                width: wp(13.33),
                marginRight: wp(-2),
              }}
            >
              <Image
                source={member}
                alt="member"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </MemberImage>
            <MemberImage
              style={{
                height: wp(13.33),
                width: wp(13.33),
                marginRight: wp(-2),
              }}
            >
              <Image
                source={member}
                alt="member"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </MemberImage>
            <MemberImage
              style={{
                height: wp(13.33),
                width: wp(13.33),
                marginRight: wp(-2),
              }}
            >
              <Image
                source={member}
                alt="member"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </MemberImage>
            <MemberImage
              style={{
                height: wp(13.33),
                width: wp(13.33),
                marginRight: wp(-2),
              }}
            >
              <Image
                source={member}
                alt="member"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </MemberImage>
            <MemberImage
              style={{
                height: wp(13.33),
                width: wp(13.33),
                marginRight: wp(-2),
              }}
            >
              <Image
                source={member}
                alt="member"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </MemberImage>
          </MemberImageWrapper>
          <FundWrapper>
            <View>
              <Text
                style={[
                  typography.bold.h4,
                  { color: colors.GREYS.C8, lineHeight: wp(5.33) },
                ]}
              >
                $1200
              </Text>
              <Text
                style={[
                  typography.bold.h6,
                  {
                    color: colors.GREYS.C8,
                    lineHeight: wp(5.33),
                    textTransform: 'capitalize',
                  },
                ]}
              >
                total donated
              </Text>
            </View>
            <View>
              <Text
                style={[
                  typography.bold.h4,
                  { color: colors.GREYS.C8, lineHeight: wp(5.33) },
                ]}
              >
                $500
              </Text>
              <Text
                style={[
                  typography.bold.h6,
                  {
                    color: colors.GREYS.C8,
                    lineHeight: wp(5.33),
                    textTransform: 'capitalize',
                  },
                ]}
              >
                YTD
              </Text>
            </View>
            <View>
              <Text
                style={[
                  typography.bold.h4,
                  { color: colors.GREYS.C8, lineHeight: wp(5.33) },
                ]}
              >
                $500
              </Text>
              <Text
                style={[
                  typography.bold.h6,
                  {
                    color: colors.GREYS.C8,
                    lineHeight: wp(5.33),
                    textTransform: 'capitalize',
                  },
                ]}
              >
                month to date
              </Text>
            </View>
          </FundWrapper>
        </MemberWrapper>
      ) : null}
      <View style={[Custompadding.paddingTopLarge]}>
        <Text
          numberOfLines={4}
          style={[typography.regular.h6, { lineHeight: wp(5.86) }]}
        >
          {missionDetail.description}
        </Text>
      </View>
      {showMore ? (
        <View>
          {missionDetail.long_description ? (
            <Text
              numberOfLines={4}
              style={[typography.regular.h6, { lineHeight: wp(5.86) }]}
            >
              {missionDetail.long_description}
            </Text>
          ) : null}
          {missionDetail.files && missionDetail.files.length
            ? missionDetail.files.map((cameraRoll) => (
                <DetailImage
                  style={{ height: wp(42.4), width: wp(89), marginTop: wp(4) }}
                >
                  <Image
                    source={{
                      uri: missionId ? cameraRoll.file : cameraRoll.uri,
                    }}
                    alt="puppy"
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </DetailImage>
              ))
            : null}
        </View>
      ) : null}
      {missionDetail.long_description ||
      (missionDetail.files && missionDetail.files.length) ? (
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: wp(2.64),
            marginTop: wp(2.64),
          }}
        >
          <TouchableOpacity>
            <Text
              style={[
                typography.bold.h6,
                { color: colors.GREEN.C1, textTransform: 'capitalize' },
              ]}
              onPress={handleShowMore}
            >
              {showMore ? 'less' : 'more'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};
MissionDetails.propTypes = {
  missionDetail: PropTypes.object,
  missionId: PropTypes.number,
};
export default MissionDetails;

const MemberWrapper = styled.View`
  background-color: ${colors.GREYS.C7};
  border-radius: 27px;
`;
const MemberImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MemberImage = styled.View`
  background-color: ${colors.white};
  border: 1px solid ${colors.GREYS.C8};
  border-radius: 100;
`;
const FundWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const DetailImage = styled.View`
  border: 1px solid ${colors.black};
`;
