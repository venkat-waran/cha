import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native';
import Button from '../../common/button';
import CustomModal from '../../common/modal';
import { wp } from '../../../utils/Dimensions';
import { colors, typography, Custompadding } from '../../../styles/styleSheet';
import { GetIcon } from '../../../utils/Icons';
import OneTimeContri from './OneTimeContri';

const contribution = [
  { name: 'One time donation', key: 'one_time_donation', isSelected: false },
  {
    name: 'Recurring',
    subtitle: 'Every 29th',
    key: 'recurring',
    isSelected: false,
  },
  { name: 'round ups', key: 'round_ups', isSelected: false },
];
const ContributionModal = (props) => {
  const [oneTimeContriModal, setOneTimeContriModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(contribution);
  const handleItemSelect = (payment) => {
    const paymentCopy = [...paymentMethod];
    const selectedItems = paymentCopy.find((d) => d.key === payment.key);
    selectedItems.isSelected = !payment.isSelected;
    setPaymentMethod(paymentCopy);
  };

  return (
    <>
      <ModalHeader style={{ marginBottom: wp(12) }}>
        <Title style={[typography.bold.h4, { marginBottom: wp(2) }]}>
          Contribute to the SPCA
        </Title>
        <Subtitle style={[typography.regular.h6]}>
          Select one or more ways to give
        </Subtitle>
      </ModalHeader>
      {paymentMethod.map((payment) => (
        <ModalBody
          onPress={() => {
            // props.closeCallback();
            // payment.key === 'one_time_donation'
            //   ?
            setOneTimeContriModal(true);
            // : props.closeCallback;
          }}
          style={[
            Custompadding.paddingLeftRightLarge,
            Custompadding.paddingTopBottomRegular,
            {
              marginBottom: wp(2.64),
              borderColor: payment.isSelected
                ? colors.background
                : 'transparent',
              backgroundColor: colors.white,
              borderWidth: 2,
              borderRadius: 300,
              shadowColor: '#9b9b9b',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 10,
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                height: wp(8),
                width: wp(8),
                backgroundColor: payment.isSelected
                  ? colors.GREEN.C1
                  : colors.background,
                borderWidth: 3,
                borderColor: colors.GREYS.C7,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp(6.66),
              }}
              onPress={() => {
                handleItemSelect(payment);
              }}
            >
              {payment.isSelected && (
                <Text>
                  {GetIcon('check|FontAwesome5', colors.white, wp(4))}
                </Text>
              )}
            </TouchableOpacity>
            <View>
              <Text
                style={[
                  payment.isSelected
                    ? typography.bold.h6
                    : typography.regular.h6,
                  { textTransform: 'capitalize' },
                ]}
              >
                {payment.name}
              </Text>
              <Text style={[typography.regular.h8]}>{payment.subtitle}</Text>
            </View>
          </View>
          <View>
            {GetIcon('chevron-right|FontAwesome5', colors.GREYS.C8, wp(4))}
          </View>
        </ModalBody>
      ))}
      <View style={{ marginTop: wp(4) }}>
        <Button
          title="save"
          width={wp(88)}
          callback={() => {
            props.closeCallback();
            props.navigation.navigate('Landing');
          }}
        />
      </View>
      <Text
        numberOfLines={3}
        style={[typography.regular.h8, Custompadding.paddingTopBottomSmall]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <CustomModal
        noClose
        visible={oneTimeContriModal}
        closeCallback={() => setOneTimeContriModal(false)}
      >
        <OneTimeContri closeCallback={() => setOneTimeContriModal(false)} />
      </CustomModal>
    </>
  );
};
const ModalHeader = styled.View`
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text``;
const Subtitle = styled.Text``;
const ModalBody = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
ContributionModal.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
  closeCallback: PropTypes.func,
};
export default ContributionModal;
