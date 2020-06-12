import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from '../../utils/StatusBar';
import { colors } from '../../styles/styleSheet';
const CustomStatusBar = (backgroundColor) => {
  const statusBarHeight = getStatusBarHeight();
  return Platform.OS === 'ios' ? (
    <View
      style={[
        {
          height: statusBarHeight,
          backgroundColor: backgroundColor || colors.white,
        },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
    </View>
  ) : (
    <View
      style={[
        {
          height: statusBarHeight,
          backgroundColor: backgroundColor || colors.white,
        },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
    </View>
  );
};
export default CustomStatusBar;
