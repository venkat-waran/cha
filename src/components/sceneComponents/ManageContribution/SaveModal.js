import React from 'react';
import { View, Text } from 'react-native';
import { GetIcon } from '../../../utils/Icons';
import { wp } from '../../../utils/Dimensions';
import { colors } from '../../../styles/styleSheet';

const SaveModal = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    }}
  >
    {GetIcon('check|FontAwesome5', colors.textFieldBorderColor, wp(8))}
    <Text>saved</Text>
  </View>
);
export default SaveModal;
