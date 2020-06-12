/* eslint-disable */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { wp } from '../../utils/Dimensions';
import { colors, Custompadding, typography } from '../../styles/styleSheet';

export default class Button extends Component {
  render() {
    const {
      title,
      callback,
      type,
      loader,
      disable,
      width,
      height,
      alignSelf,
    } = this.props;
    return (
      <View style={[width ? width : Custompadding.paddingLeftRightLarge]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={disable ? null : callback}
          style={{
            height: height ? height : type === 'link' ? 'auto' : wp(16),
            backgroundColor: disable
              ? colors.inActivePage
              : type === 'primary'
              ? colors.primaryColor
              : type === 'link'
              ? 'transparent'
              : type === 'bordered'
              ? colors.white
              : colors.secondaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // justifyContent: type === 'link' ? 'flex-start' : 'center',
            // alignItems: type === 'link' ? 'flex-start' : 'center',
            // alignSelf:
            //   type === 'link' ? 'flex-start' : alignSelf ? alignSelf : 'center',
            width: width ? width : type === 'link' ? 'auto' : wp(38),
            paddingHorizontal: type === 'bordered' ? wp(5.55) : 0,
            borderRadius: type === 'bordered' ? wp(5.33) : wp(3.2),
            borderWidth: type === 'bordered' ? 5 : 1,
            borderType: 'solid',
            borderColor: disable
              ? colors.inActivePage
              : type === 'primary'
              ? colors.primaryColor
              : type === 'link'
              ? 'transparent'
              : type === 'bordered'
              ? colors.background
              : colors.secondaryColor,
          }}
        >
          {loader ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text
              style={[
                type === 'bordered' ? typography.bold.h4 : typography.bold.h4,
                {
                  color:
                    type === 'primary'
                      ? colors.black
                      : type === 'link'
                      ? colors.BLUES.C2
                      : type === 'bordered'
                      ? colors.black
                      : colors.white,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                },
              ]}
            >
              {title}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
