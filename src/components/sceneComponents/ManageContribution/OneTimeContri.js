import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, View, TouchableOpacity } from 'react-native';
import Button from '../../common/button';
import Input from '../../common/CustomTextField';
import { wp } from '../../../utils/Dimensions';
import { colors, typography, Custompadding } from '../../../styles/styleSheet';
import { GetIcon } from '../../../utils/Icons';
const OneTimeContri = (props) => (
  <>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <TouchableOpacity onPress={props.closeCallback}>
        {GetIcon('chevron-left|FontAwesome5', colors.black, wp(6))}
      </TouchableOpacity>
      <Title
        style={[
          typography.bold.h4,
          {
            marginBottom: wp(2),
            textTransform: 'capitalize',
            textAlign: 'center',
            marginLeft: wp(12),
          },
        ]}
      >
        one time contribution
      </Title>
    </View>
    <View
      style={{
        marginVertical: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ width: wp(80) }}>
        <Input placeholder="enter your contribution amount" />
      </View>
      <TouchableOpacity
        style={[
          Custompadding.paddingBottomSmall,
          {
            alignItems: 'flex-end',
          },
        ]}
      >
        <Text>{GetIcon('x-circle|Feather', colors.GREYS.C6, wp(6))}</Text>
      </TouchableOpacity>
    </View>
    <View style={{ marginTop: wp(4) }}>
      <Button
        title="make donation"
        width={wp(88)}
        callback={() => {
          props.closeCallback();
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
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
    {/* <CustomModal
        noClose
        visible={openModal}
        closeCallback={() => setOpenModal(false)}
      >
        <SaveModal />
      </CustomModal> */}
  </>
);
const Title = styled.Text``;
OneTimeContri.propTypes = {
  //   navigation: PropTypes.object,
  //   navigate: PropTypes.func,
  closeCallback: PropTypes.func,
};
export default OneTimeContri;
