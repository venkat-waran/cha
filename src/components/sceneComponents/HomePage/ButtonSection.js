import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { wp } from '../../../utils/Dimensions';
import { Custompadding } from '../../../styles/styleSheet';
import Button from '../../common/button';
import CustomModal from '../../common/modal';
import Login from './Login';

const ButtonSection = ({
  authCallback,
  closeCallback,
  onButtonClick,
  showAuthModal,
  isLoading,
}) => (
  <>
    <ButtonWrapper>
      <View
        style={[
          Custompadding.paddingBottomRegular,
          Custompadding.paddingTopXLarge,
        ]}
      >
        <Button
          type="bordered"
          title="start a mission"
          width={wp(86)}
          height={wp(21.33)}
          callback={() => onButtonClick('startMission')}
        />
      </View>
      <Button
        type="bordered"
        title="find a mission"
        width={wp(86)}
        height={wp(21.33)}
        callback={() => onButtonClick('findMission')}
      />
      <Button
        type="link"
        title="Already have an account? Sign In."
        width={wp(86)}
        height={wp(21.33)}
        callback={() => onButtonClick('signIn')}
      />
    </ButtonWrapper>
    <CustomModal noClose visible={showAuthModal} closeCallback={closeCallback}>
      <Login
        closeCallback={closeCallback}
        authCallback={authCallback}
        isLoading={isLoading}
      />
    </CustomModal>
  </>
);

ButtonSection.propTypes = {
  authCallback: PropTypes.func,
  closeCallback: PropTypes.func,
  onButtonClick: PropTypes.func,
  showAuthModal: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ButtonSection;

const ButtonWrapper = styled.View``;
