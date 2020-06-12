import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button from './button';
import { typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';

export const stylesheet = {
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export const ConfirmationModal = ({
  onConfirm,
  onClose,
  cancelText,
  confirmText,
  customText,
}) => (
  <>
    <Text
      style={[
        typography.regular.h2,
        { marginVertical: wp(8), textAlign: 'center' },
      ]}
    >
      {customText}
    </Text>
    <View style={stylesheet.buttonWrapper}>
      <Button
        width={wp(40)}
        callback={onClose}
        title={cancelText}
        type="primary"
      />
      <Button width={wp(40)} callback={onConfirm} title={confirmText} />
    </View>
  </>
);

ConfirmationModal.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
};

ConfirmationModal.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  customText: PropTypes.string,
};

export default ConfirmationModal;
