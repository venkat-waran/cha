/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import styled from 'styled-components';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../common/header';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';

const Notifications = (props) => {
  const menu = [
    { menuItem: 'contribution made', onPress: null },
    { menuItem: 'milestone achieved', onPress: null },
  ];
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={[Custompadding.paddingLarge]}>
        <Header
          heading="Notifications"
          backCallback={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{ marginTop: wp(12) }}>
          {menu.map((item) => (
            <TouchableOpacity
              style={[
                Custompadding.paddingBottomXLarge,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
              onPress={item.onPress}
            >
              <Text
                style={[typography.bold.h5, { textTransform: 'capitalize' }]}
              >
                {item.menuItem}
              </Text>
              <SwitchToggle
                containerStyle={{
                  width: wp(12.26),
                  height: wp(7.2),
                  borderRadius: 25,
                  backgroundColor: '#ccc',
                  padding: 1,
                }}
                circleStyle={{
                  width: wp(6.66),
                  height: wp(6.66),
                  borderRadius: 19,
                  backgroundColor: 'white',
                }}
                switchOn={switchOn}
                onPress={() => setSwitchOn(!switchOn)}
                backgroundColorOn="#00C470"
                circleColorOff="white"
                circleColorOn="white"
                duration={500}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};
Notifications.propTypes = {
  navigation: PropTypes.object,
};
export default Notifications;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
