/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import facebook from '../../../assets/images/facebook.png';
import google from '../../../assets/images/google.png';
import apple from '../../../assets/images/apple.png';
import twitter from '../../../assets/images/twitter.png';
import loader from '../../../assets/images/loader.gif';
import { wp } from '../../../utils/Dimensions';
import { GetIcon } from '../../../utils/Icons';
import { typography, Custompadding, colors } from '../../../styles/styleSheet';

const option = [
  {
    icon: facebook,
    value: 'Continue with Facebook',
    type: 'facebook',
    bgColor: colors.BLUES.C3,
    showButton: true,
  },
  {
    icon: twitter,
    value: 'Continue with twitter',
    type: 'twitter',
    bgColor: colors.BLUES.C2,
    showButton: true,
  },
  {
    icon: google,
    value: 'Continue with google',
    type: 'google',
    bgColor: colors.white,
    showButton: true,
  },
  {
    icon: apple,
    value: 'Continue with apple',
    type: 'apple',
    bgColor: colors.GREYS.C6,
    showButton: Platform.OS === 'ios',
  },
  {
    // value: 'phone or email',
    value: 'Phone or Email',
    type: 'phone_email',
    bgColor: colors.GREYS.C7,
    showButton: true,
  },
];
const Login = (props) => (
  <Container>
    <Text
      style={[
        typography.bold.h1,
        Custompadding.paddingBottomXLarge,
        {
          textTransform: 'capitalize',
        },
      ]}
    >
      access your account
    </Text>
    {!props.isLoading ? (
      <>
        {option.map(
          (item) =>
            item.showButton && (
              <ButtonWrapper
                key={item.type}
                onPress={() => {
                  props.authCallback(item.type);
                }}
                style={[
                  Custompadding.paddingTopBottomRegular,
                  {
                    marginBottom: wp(4),
                    backgroundColor: item.bgColor,
                    borderWidth: 2,
                    borderColor: colors.GREYS.C7,
                  },
                ]}
              >
                {item.icon && (
                  <View style={{ height: wp(8.55), width: wp(8.55) }}>
                    <Image
                      source={item.icon}
                      alt="facebook"
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                )}
                <Text
                  style={[
                    typography.bold.h4,
                    {
                      color:
                        item.type === 'facebook' || item.type === 'twitter'
                          ? colors.white
                          : colors.black,
                      lineHeight: 28,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.value}
                </Text>
              </ButtonWrapper>
            ),
        )}
        <TouchableOpacity
          onPress={props.closeCallback}
          style={[Custompadding.paddingTopBottomXLarge]}
        >
          {GetIcon('chevron-down|FontAwesome5', colors.black, wp(4))}
        </TouchableOpacity>
      </>
    ) : (
      <View style={{ height: wp(100), width: wp(100) }}>
        <Image
          source={loader}
          alt="loader"
          style={{
            height: '100%',
            width: '100%',
            // resizeMode: 'contain',
          }}
        />
      </View>
    )}
  </Container>
);

Login.propTypes = {
  authCallback: PropTypes.func,
  closeCallback: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Login;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* background-color: ${colors.BLUES.C3}; */
  border-radius: 14px;
  width: 100%;
`;
