/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../common/header';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import { useLogoutHook } from '../../app/shared/hooks';

const Settings = (props) => {
  const { onLogout } = useLogoutHook(props);

  const menu = [
    { menuItem: 'Linked Card', onPress: null },
    {
      menuItem: 'Notifications',
      onPress: () => props.navigation.navigate('Notifications'),
    },
    { menuItem: 'About Charitable', onPress: null },
    {
      menuItem: 'Logout',
      onPress: onLogout,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={[Custompadding.paddingLarge]}>
        <Header
          heading="settings"
          backCallback={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ marginTop: wp(12) }}>
          {menu.map((item) => (
            <TouchableOpacity
              style={[Custompadding.paddingBottomXLarge]}
              onPress={item.onPress}
            >
              <Text style={[typography.bold.h5]}>{item.menuItem}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object,
};

export default Settings;

const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
