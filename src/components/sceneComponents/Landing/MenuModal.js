import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { typography, Custompadding, colors } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import profileImg from '../../../assets/images/dummy-profile.png';

const MenuModal = ({ menu, onEditProfile, ...restProps }) => {
  const {
    Dash_data: {
      GET_PROFILE_API: { data: profile },
    },
  } = restProps;
  return (
    <View
      style={[
        Custompadding.paddingLeftXLarge,
        {
          height: '100%',
          width: wp(78),
          // marginRight: wp(12),
          backgroundColor: colors.white,
          paddingVertical: Platform.OS === 'android' ? wp(2.64) : wp(12),
        },
      ]}
    >
      <TouchableOpacity onPress={onEditProfile}>
        <Text
          style={[
            typography.bold.h6,
            Custompadding.paddingRightRegular,
            Custompadding.paddingBottomRegular,
            { alignSelf: 'flex-end', color: colors.GREEN.C1 },
          ]}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: wp(8),
        }}
      >
        <ImageWrapper
          style={{
            height: wp(22.93),
            width: wp(22.93),
            marginBottom: wp(4),
          }}
        >
          <Image
            source={
              profile && profile.profile_image
                ? { uri: profile.profile_image }
                : profileImg
            }
            alt="placeholder"
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
              borderRadius: 100,
            }}
          />
        </ImageWrapper>
        {profile && profile.name ? (
          <Text
            style={[typography.regular.h7, { textTransform: 'capitalize' }]}
          >
            {profile.name}
          </Text>
        ) : null}
      </View>
      {menu.map((item) => (
        <TouchableOpacity
          onPress={item.onPress}
          style={[
            Custompadding.paddingBottomRegular,
            {
              borderBottomColor: colors.GREYS.C8,
              borderBottomWidth: 1,
              marginTop: wp(4),
            },
          ]}
        >
          <Text style={[typography.regular.h2]}>{item.menuItem}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
MenuModal.propTypes = {
  menu: PropTypes.array,
  onEditProfile: PropTypes.func,
};
export default MenuModal;
const ImageWrapper = styled.View`
  background-color: ${colors.GREYS.C7};
  border-radius: 100px;
`;
