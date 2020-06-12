/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { GetIcon } from '../../utils/Icons';
import { colors, Custompadding } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import MenuModal from '../sceneComponents/Landing/MenuModal';
import CustomModal from '../common/modal';
import ContributionCard from '../sceneComponents/Landing/ContributionCard';
import ContributionModal from '../sceneComponents/ManageContribution/ContributionModal';
import puppy from '../../assets/images/puppy.png';
// import { getJWTToken } from '../../app/shared/utils/token';
const Landing = ({ navigation, ...restProps }) => {
  const [menuModal, setMenuModal] = useState(false);
  const [contributeModal, setContributeModal] = useState(false);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <ContributionCard
              cardCallBack={() => navigation.navigate('MissionControl')}
              contributionCallback={() => setContributeModal(true)}
              cardData={[
                {
                  image: puppy,
                  name: 'spca',
                  totalFund: '$1,200',
                  monthlyFund: '$400',
                  pendingFund: '$342',
                  vacancy: '200',
                  roundupAmount: ' $5/m',
                },
              ]}
            />
            <ContributionCard
              cardCallBack={() => navigation.navigate('MissionControl')}
              contributionCallback={() => setContributeModal(true)}
              cardData={[
                {
                  image: puppy,
                  name: 'spca',
                  totalFund: '$1,200',
                  monthlyFund: '$400',
                  pendingFund: '$342',
                  vacancy: '200',
                  roundupAmount: ' $5/m',
                },
              ]}
            />
          </ScrollView>
          <Stripe style={[Custompadding.paddingRegular]}>
            <Text>$2.80 until your next round-up</Text>
            <TouchableOpacity onPress={() => setMenuModal(true)}>
              <Text>
                {GetIcon('arrow-right|FontAwesome5', colors.black, wp(4))}
              </Text>
            </TouchableOpacity>
          </Stripe>
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
      <CustomModal
        visible={contributeModal}
        closeCallback={() => setContributeModal(false)}
      >
        <ContributionModal
          navigation={navigation}
          closeCallback={() => setContributeModal(false)}
        />
      </CustomModal>
    </>
  );
};
Landing.propTypes = {
  navigation: PropTypes.object,
};
export default Landing;
const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const FixedHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Stripe = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.yellow};
`;
