/* eslint-disable */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../common/header';
import Tabs from '../common/tabs';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
const menu = [
  {
    menuItem: 'Bank Account #',
    paymentDate: 'January 20th',
    amount: '-$300',
  },
  {
    menuItem: 'Bank Account #',
    paymentDate: 'January 20th',
    amount: '-$300',
  },
  {
    menuItem: 'Bank Account #',
    paymentDate: 'January 20th',
    amount: '-$300',
  },
];
const tabItems = [
  {
    value: 'withdrawls',
    key: 'withdrawls',
  },
  {
    value: 'contributions',
    key: 'contributions',
  },
];
const AccountBalance = (props) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].key);
  const handleTabClick = (clickedTab) => {
    setActiveTab(clickedTab.key);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={[Custompadding.paddingLarge]}>
        <Header
          backCallback={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={[typography.regular.h2, { textAlign: 'center' }]}>
          SPCA
        </Text>
        <Text
          style={[
            typography.regular.h4,
            {
              textAlign: 'center',
              textTransform: 'capitalize',
              marginBottom: wp(6),
              //   backgroundColor: 'red',
            },
          ]}
        >
          admin account
        </Text>
        <Amount
          style={{
            fontFamily: 'Bariol-Regular',
            fontSize: wp(11.2),
            textAlign: 'center',
            textTransform: 'capitalize',
            // backgroundColor: 'blue',
          }}
        >
          $300.00
        </Amount>
        <Tag
          style={[
            Custompadding.paddingLeftRightXLarge,
            Custompadding.paddingTopBottomRegular,
            { marginTop: wp(3), marginBottom: wp(2.64) },
          ]}
        >
          <Text
            style={[
              typography.regular.h6,
              { textAlign: 'center', textTransform: 'capitalize' },
            ]}
          >
            transfer balance
          </Text>
        </Tag>
        <Tabs
          details={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {menu.map((item) => (
            <View
              style={[
                Custompadding.paddingBottomRegular,
                {
                  borderBottomColor: colors.borderColor,
                  borderBottomWidth: 1,
                  marginTop: wp(4),
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: wp(1),
                }}
              >
                <View>
                  <Text style={[typography.regular.h7]}>{item.menuItem}</Text>
                  <Text style={[typography.regular.h7]}>
                    {item.paymentDate}
                  </Text>
                </View>
                <View>
                  <Text style={[typography.regular.h7]}>{item.amount}</Text>
                  <Text style={[typography.regular.h7]}>
                    {item.paymentMode}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};
export default AccountBalance;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
const Tag = styled.View`
  background-color: ${colors.background};
  border-radius: 11px;
  align-self: center;
`;
const Amount = styled.Text``;
