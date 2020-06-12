import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import { Custompadding, colors, typography } from '../../styles/styleSheet';
import Header from '../common/header';
import Input from '../common/CustomTextField';
import CustomModal from '../common/modal';
import MissionCard from '../sceneComponents/FindMission/MissionCard';
import mission1 from '../../assets/images/mission1.png';
import mission2 from '../../assets/images/mission2.png';
import mission3 from '../../assets/images/mission3.png';
import puppy from '../../assets/images/puppy.png';
import { wp } from '../../utils/Dimensions';
import { GetIcon } from '../../utils/Icons';
import LocationModal from '../sceneComponents/FindMission/LocationModal';

const FindMission = ({ navigation }) => {
  const [locationModal, setLocationModal] = useState(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Container style={[Custompadding.paddingLarge]}>
          <Header
            heading="find a mission"
            backCallback={() => {
              navigation.goBack();
            }}
          />
          <View style={{ marginVertical: wp(4) }}>
            <Input
              isSearchInput
              text="Search"
              onPressSearch={() => navigation.navigate('SearchMission')}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                Custompadding.paddingBottomRegular,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <Text
                style={[typography.bold.h1, { textTransform: 'capitalize' }]}
              >
                global
              </Text>
              <TouchableOpacity onPress={() => setLocationModal(true)}>
                <Text
                  style={[
                    typography.regular.h7,
                    { color: colors.GREEN.C3, textTransform: 'capitalize' },
                  ]}
                >
                  change location
                </Text>
              </TouchableOpacity>
            </View>
            <MissionCard
              menu={[
                {
                  tag: true,
                  icon: mission1,
                  missionName: 'SPCA',
                  amount: '$1000',
                  doner: '20 vaccines',
                  onPress: null,
                },
                {
                  tag: true,
                  icon: mission2,
                  missionName: 'Boys and Girls Club',
                  amount: '$1000',
                  doner: 'board games',
                  onPress: null,
                },
                {
                  icon: mission3,
                  missionName: 'Hurdle race for Hade',
                  amount: '$3000',
                  doner: '1000 meals',
                  onPress: null,
                },
                {
                  icon: puppy,
                  missionName: 'Second Harvest Food agriculture',
                  amount: '$100',
                  doner: '500 turkeys',
                  onPress: null,
                },
              ]}
            />
            <LocationCard
              style={{
                marginTop: wp(6.66),
                marginBottom: wp(4),
                height: wp(38.93),
                width: wp(88),
                backgroundColor: colors.error,
              }}
            >
              <ImageBackground
                source={puppy}
                alt="location"
                style={{
                  height: wp(38.93),
                  width: wp(88),
                  borderRadius: 20,
                  position: 'relative',
                }}
              />
              <View
                style={[
                  Custompadding.paddingTopBottomXLarge,
                  {
                    position: 'absolute',
                    justifyContent: 'center',
                    //   alignItems: 'center',
                    flex: 1,
                    marginHorizontal: wp(8),
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', marginBottom: wp(2.64) }}>
                  <Text>
                    {GetIcon(
                      'location-arrow|FontAwesome5',
                      colors.GREEN.C1,
                      wp(6),
                    )}
                  </Text>
                  <Text
                    style={[
                      typography.regular.h4,
                      { textTransform: 'capitalize', marginLeft: wp(3.4) },
                    ]}
                  >
                    nearby
                  </Text>
                </View>
                <Text style={[typography.bold.h6]}>
                  Show missions nearby to your neighborhood using location
                  services
                </Text>
              </View>
            </LocationCard>
            <MissionCard
              menu={[
                {
                  tag: true,
                  icon: mission1,
                  missionName: 'SPCA',
                  amount: '$1000',
                  doner: '20 vaccines',
                  onPress: null,
                },
                {
                  tag: true,
                  icon: mission2,
                  missionName: 'Boys and Girls Club',
                  amount: '$1000',
                  doner: 'board games',
                  onPress: null,
                },
                {
                  icon: mission3,
                  missionName: 'Hurdle race for Hade',
                  amount: '$3000',
                  doner: '1000 meals',
                  onPress: null,
                },
                {
                  icon: puppy,
                  missionName: 'Second Harvest Food agriculture',
                  amount: '$100',
                  doner: '500 turkeys',
                  onPress: null,
                },
              ]}
            />
            <LocationCard
              style={{
                marginTop: wp(6.66),
                marginBottom: wp(4),
                height: wp(38.93),
                width: wp(88),
                backgroundColor: colors.error,
              }}
            >
              <ImageBackground
                source={puppy}
                alt="location"
                style={{
                  height: wp(38.93),
                  width: wp(88),
                  borderRadius: 20,
                  position: 'relative',
                }}
              />
              <View
                style={[
                  Custompadding.paddingTopBottomXLarge,
                  {
                    position: 'absolute',
                    justifyContent: 'center',
                    //   alignItems: 'center',
                    flex: 1,
                    marginHorizontal: wp(8),
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', marginBottom: wp(2.64) }}>
                  <Text>
                    {GetIcon(
                      'location-arrow|FontAwesome5',
                      colors.GREEN.C1,
                      wp(6),
                    )}
                  </Text>
                  <Text
                    style={[
                      typography.regular.h4,
                      { textTransform: 'capitalize', marginLeft: wp(3.4) },
                    ]}
                  >
                    start a mission
                  </Text>
                </View>
                <Text style={[typography.bold.h6]}>
                  Setup automatic donations for a cause that you are passionate
                  about
                </Text>
              </View>
            </LocationCard>
            <MissionCard
              menu={[
                {
                  tag: true,
                  icon: mission1,
                  missionName: 'SPCA',
                  amount: '$1000',
                  doner: '20 vaccines',
                  onPress: null,
                },
                {
                  tag: true,
                  icon: mission2,
                  missionName: 'Boys and Girls Club',
                  amount: '$1000',
                  doner: 'board games',
                  onPress: null,
                },
                {
                  icon: mission3,
                  missionName: 'Hurdle race for Hade',
                  amount: '$3000',
                  doner: '1000 meals',
                  onPress: null,
                },
                {
                  icon: puppy,
                  missionName: 'Second Harvest Food agriculture',
                  amount: '$100',
                  doner: '500 turkeys',
                  onPress: null,
                },
              ]}
            />
          </ScrollView>
        </Container>
      </SafeAreaView>
      <CustomModal
        noClose
        visible={locationModal}
        closeCallback={() => setLocationModal(false)}
      >
        <LocationModal
          navigation={navigation}
          closeCallback={() => setLocationModal(false)}
        />
      </CustomModal>
    </>
  );
};
FindMission.propTypes = {
  navigation: PropTypes.object,
};
export default FindMission;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
const LocationCard = styled.View`
  border-radius: 20px;
`;
