import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../common/header';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';

const CreateMission = (props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
    <Container style={[Custompadding.paddingLarge]}>
      <Header
        heading="mission control"
        backCallback={() => {
          props.navigation.navigate('Landing');
        }}
      />
      <View style={{ justifyContent: 'flex-end', flex: 0.9 }}>
        <Text
          style={[
            typography.bold.h2,
            Custompadding.paddingBottomRegular,
            { textAlign: 'center' },
          ]}
        >
          Create your mission today
        </Text>
        <Text
          style={[
            typography.regular.h2,
            Custompadding.paddingBottomRegular,
            Custompadding.paddingLeftRightLarge,
            { textAlign: 'center' },
          ]}
        >
          A lot of little change can make a big change.
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('About')}
          style={{
            backgroundColor: colors.GREYS.C7,
            paddingVertical: wp(6.4),
            marginBottom: wp(2.64),
            borderRadius: 14,
          }}
        >
          <Text style={[typography.bold.h4, { textAlign: 'center' }]}>
            Start a Mission
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            typography.regular.h6,
            { lineHeight: wp(5.86), color: colors.GREYS.C8 },
          ]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </Container>
  </SafeAreaView>
);
CreateMission.propTypes = {
  navigation: PropTypes.object,
};
export default CreateMission;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
