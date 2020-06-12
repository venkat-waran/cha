import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { wp, hp } from '../../utils/Dimensions';
import { colors, Custompadding, typography } from '../../styles/styleSheet';

const CustomModal = ({
  visible,
  closeCallback,
  children,
  height,
  noClose,
  overlay,
}) => (
  <Modal
    isVisible={visible}
    onBackdropPress={closeCallback}
    onBackButtonPress={closeCallback}
    overlay={overlay}
    style={{
      margin: 0,
      justifyContent: overlay ? 'flex-start' : 'flex-end',
      marginTop: overlay ? wp(16) : 0,
    }}
  >
    <View
      style={[
        Custompadding.paddingTopBottomLarge,
        Custompadding.paddingLeftRightLarge,
        {
          height: height ? hp(height) : 'auto',
          backgroundColor: overlay ? 'transparent' : colors.white,
          borderTopLeftRadius: wp(5),
          borderTopRightRadius: wp(5),
        },
      ]}
    >
      {!noClose && (
        <TouchableOpacity
          onPress={closeCallback}
          style={[
            Custompadding.paddingBottomSmall,
            {
              alignItems: 'flex-end',
            },
          ]}
        >
          <Text
            style={[
              typography.regular.h6,
              { color: colors.black, textTransform: 'capitalize' },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  </Modal>
);
CustomModal.propTypes = {
  visible: PropTypes.bool,
  closeCallback: PropTypes.func,
  children: PropTypes.node,
  height: PropTypes.string,
  noClose: PropTypes.string,
  overlay: PropTypes.string,
};
export default CustomModal;
