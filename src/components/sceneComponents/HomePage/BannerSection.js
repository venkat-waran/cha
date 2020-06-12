/* eslint-disable */
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import banner from '../../../assets/images/banner1.png';
import { wp } from '../../../utils/Dimensions';
import { typography, colors } from '../../../styles/styleSheet';
const BannerSection = () => {
  return (
    <>
      <ImageBackground
        source={banner}
        style={{ height: wp(120), width: wp(100) }}
      >
        <View
          style={{
            height: wp(120),
            width: wp(100),
            position: 'absolute',
            top: 0,
            backgroundColor: colors.BLUES.C1,
            opacity: 0.75,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginHorizontal: 40,
          }}
        >
          <Text
            style={[
              typography.bold.h1,
              { color: colors.white, textAlign: 'center', lineHeight: 40 },
            ]}
          >
            Support individual and charity operated missions
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};
export default BannerSection;
