/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../common/header';
import Tabs from '../common/tabs';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import { GetIcon } from '../../utils/Icons';
const menu = [
  {
    menuItem: 'SPCA',
    amount: '$5',
    paymentMode: 'Round-up',
    paymentDate: '01/24/18',
  },
  {
    menuItem: 'Boys and Girls Club',
    amount: '$15',
    paymentMode: 'Fixed Payment',
    paymentDate: '01/19/18',
  },
  {
    menuItem: 'SPCA',
    amount: '$20',
    paymentMode: 'Round-up',
    paymentDate: '12/24/17',
  },
];
const tabItems = [
  {
    value: 'all missions',
    key: 'all_missions',
  },
  {
    value: '501 3C',
    key: '501_3C',
  },
];
const ContributionHistory = (props) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].key);
  const handleTabClick = (clickedTab) => {
    setActiveTab(clickedTab.key);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={[Custompadding.paddingLarge]}>
        <Header
          heading="contribution history"
          backCallback={() => {
            props.navigation.goBack();
          }}
          rightHeading={GetIcon('upload|Feather', colors.black, wp(5))}
        />
        <Tabs
          details={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <YearTag style={{ paddingVertical: wp(2), marginVertical: wp(5.33) }}>
          <Text style={[typography.bold.h7, { textAlign: 'center' }]}>
            2020
          </Text>
        </YearTag>
        <ScrollView showsVerticalScrollIndicator={false}>
          {menu.map((item) => (
            <View
              style={[
                Custompadding.paddingBottomRegular,
                {
                  borderBottomColor: colors.GREYS.C8,
                  borderBottomWidth: 1,
                  marginTop: wp(4),
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: wp(1),
                }}
              >
                <Text style={[typography.bold.h6, { color: colors.GREYS.C8 }]}>
                  {item.menuItem}
                </Text>
                <Text
                  style={[typography.regular.h6, { color: colors.GREYS.C8 }]}
                >
                  {item.amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={[typography.regular.h6, { color: colors.GREYS.C8 }]}
                >
                  {item.paymentMode}
                </Text>
                <Text
                  style={[typography.regular.h6, { color: colors.GREYS.C8 }]}
                >
                  {item.paymentDate}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};
export default ContributionHistory;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
const YearTag = styled.View`
  background-color: ${colors.GREYS.C7};
  border-radius: 17px;
`;
