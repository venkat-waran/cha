/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { GetIcon } from '../../utils/Icons';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import MenuModal from '../sceneComponents/Landing/MenuModal';
// import { getJWTToken } from '../../app/shared/utils/token';
const Dashboard = ({ navigation, ...restProps }) => {
  const [menuModal, setMenuModal] = useState(false);
  const handleEditProfile = () => {
    setMenuModal(false);
    navigation.navigate('Profile', {
      emailInfo: '',
      password: '',
      showEmail: true,
      showPhone: true,
      isEdit: true,
    });
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Container style={[Custompadding.paddingTopLarge]}>
          <FixedHeader
            style={[
              Custompadding.paddingBottomXLarge,
              Custompadding.paddingLeftRightLarge,
            ]}
          >
            <TouchableOpacity onPress={() => setMenuModal(true)}>
              <Text>{GetIcon('bars|FontAwesome5', colors.black, wp(8))}</Text>
            </TouchableOpacity>
          </FixedHeader>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 0.9,
              paddingHorizontal: wp(11),
            }}
          >
            <Text style={[typography.regular.h2]}>
              Your dashboard is empty. You are not part of any missions.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('FindMission')}
              style={[
                Custompadding.paddingTopBottomLarge,
                {
                  backgroundColor: colors.GREEN.C3,
                  borderRadius: 30,
                  borderColor: colors.GREEN.C4,
                  borderWidth: 6,
                  marginTop: wp(42.66),
                },
              ]}
            >
              <Text
                style={[
                  typography.bold.h4,
                  { color: colors.white, textAlign: 'center' },
                ]}
              >
                Find a Mission
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </SafeAreaView>
      <Modal
        isVisible={menuModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => setMenuModal(false)}
        onRequestClose={() => setMenuModal(false)}
        onBackButtonPress={() => setMenuModal(false)}
        hideModalContentWhileAnimating
        style={{
          margin: 0,
          justifyContent: 'flex-start',
        }}
      >
        <MenuModal
          onEditProfile={handleEditProfile}
          menu={[
            {
              menuItem: 'Find a Mission',
              onPress: () => {
                setMenuModal(false);
                navigation.navigate('FindMission');
              },
            },
            {
              menuItem: 'Contribution History',
              onPress: () => {
                setMenuModal(false);
                navigation.navigate('History');
              },
            },
            {
              menuItem: 'Mission Control',
              onPress: () => {
                setMenuModal(false);
                navigation.navigate('MissionControl');
              },
            },
            {
              menuItem: 'Settings',
              onPress: () => {
                setMenuModal(false);
                navigation.navigate('Settings');
              },
            },
          ]}
          {...restProps}
        />
      </Modal>
    </>
  );
};
Dashboard.propTypes = {
  navigation: PropTypes.object,
};
export default Dashboard;
const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const FixedHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;
