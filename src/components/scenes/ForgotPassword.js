/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../common/CustomTextField';
import Button from '../common/button';
import Header from '../common/header';
import { colors, Custompadding } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import { useEmailHook } from '../../app/shared/hooks';

const ForgotPassword = (props) => {
  const { navigation } = props;

  const { email } = useEmailHook(props, {
    onSuccessEmail,
    onErrorEmail,
  });
  function onSuccessEmail() {
    alert('Password reset email sent successfully'); // TODO handle error
    props.navigation.navigate('AuthLogin');
  }

  function onErrorEmail(error) {
    alert(error.message); // TODO handle error
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={[
          Custompadding.paddingLarge,
          { backgroundColor: colors.white, flex: 1 },
        ]}
      >
        <Header
          heading="Forgot Password"
          successText
          backCallback={() => {
            navigation.goBack();
          }}
        />
        <View style={[Custompadding.paddingTopBottomLarge]}>
          <CustomInput
            placeholder="Email"
            onChangeText={email.onChange}
            onBlur={email.onBlur}
            value={email.value}
            errorText={email.error}
          />
        </View>
        <View>
          <Button
            type="secondary"
            title={email.isLoading ? 'Loading' : 'Send Email'}
            disable={email.isLoading}
            width={wp(80)}
            callback={email.resetPassword}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
ForgotPassword.propTypes = {
  navigation: PropTypes.object,
};
export default ForgotPassword;
