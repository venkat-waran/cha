import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors, typography } from '../../../styles/styleSheet';
import { wp } from '../../../utils/Dimensions';
import { GetIcon } from '../../../utils/Icons';
import CustomInput from '../../common/CustomTextField';
import Button from '../../common/button';
const CreateMilestone = (props) => {
  const titleRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const {
    title,
    amount,
    description,
    createMilestone: { onCreate, loader: milestoneLoader },
  } = props;
  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity onPress={props.closeCallback}>
            {GetIcon('chevron-down|Feather', colors.black, wp(6))}
          </TouchableOpacity>
          <Text
            style={[
              typography.bold.h4,
              {
                marginBottom: wp(2),
                textTransform: 'capitalize',
                textAlign: 'center',
                marginLeft: wp(25),
              },
            ]}
          >
            Create Milestone
          </Text>
        </View>
        <View>
          <CustomInput
            placeholder="title"
            onChangeText={title.onChange}
            onBlur={title.onBlur}
            value={title.value}
            errorText={title.error}
            ref={titleRef}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current.focus()}
          />
        </View>
        <View>
          <CustomInput
            placeholder="Description"
            onChangeText={description.onChange}
            onBlur={description.onBlur}
            value={description.value}
            errorText={description.error}
            ref={descriptionRef}
            returnKeyType="next"
            onSubmitEditing={() => amountRef.current.focus()}
          />
        </View>
        <View>
          <CustomInput
            placeholder="Amount"
            onChangeText={amount.onChange}
            onBlur={amount.onBlur}
            value={amount.value || ''}
            errorText={amount.error}
            keyboardType="numeric"
            ref={amountRef}
            returnKeyType="done"
            onSubmitEditing={() => {
              if (Keyboard) Keyboard.dismiss();
              onCreate();
            }}
          />
        </View>
        <View style={{ marginTop: wp(4) }}>
          <Button
            title={milestoneLoader ? 'Creating ' : 'Create Milestone'}
            width={wp(88)}
            callback={onCreate}
            disable={milestoneLoader}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
CreateMilestone.propTypes = {
  title: PropTypes.object,
  amount: PropTypes.object,
  description: PropTypes.object,
  createMilestone: PropTypes.object,
  closeCallback: PropTypes.func,
};
export default CreateMilestone;
