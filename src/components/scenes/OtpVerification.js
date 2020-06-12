/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../common/CustomTextField';
import Button from '../common/button';
import Header from '../common/header';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import { usePhoneAuthHook, useLoginHook } from '../../app/shared/hooks';

const OtpVerification = (props) => {
  const otpRef = useRef(null);
  const { route, navigation } = props;
  const { phone, confirmResult } = route.params;
  const [seconds, setSeconds] = useState(30);
  const [isOtpEditable, setIsOtpEditable] = useState(true);

  const { otp, mobile } = usePhoneAuthHook(props, {
    onSuccessMobile,
    onErrorMobile,
    onSuccessOtp,
    onErrorOtp,
    phone,
    confirmResult,
  });
  // eslint-disable-next-line no-unused-vars
  const { onLogin, loginLoader } = useLoginHook(props, {
    onLoginSuccess,
    onLoginError,
  });
  function onSuccessMobile(result) {
    if (result) {
      props.navigation.navigate('Otp', {
        phone,
        confirmResult: result,
      });
    }
  }

  function onErrorMobile(error) {
    alert(error.message); // TODO handle error
  }

  function onSuccessOtp(type, payload) {
    if (type === 'register') {
      props.navigation.navigate('Profile', {
        emailInfo: '',
        password: '',
        showEmail: true,
        showPhone: true,
      });
    } else {
      onLogin(payload);
    }
  }
  function onErrorOtp(error) {
    alert(error); // TODO handle error
  }
  function onLoginSuccess() {
    // props.navigation.navigate('Landing');
  }
  function onLoginError(error) {
    // eslint-disable-next-line no-console
    console.log(error); // TODO handle error
  }
  const onOtpSendSuccess = () => {
    if (seconds === 0) setSeconds(30);
    let interval = null;
    setIsOtpEditable(false);
    interval = setInterval(() => {
      setSeconds((second) => {
        if (second === 0) {
          clearInterval(interval);
          setIsOtpEditable(true);
          return 0;
        }
        return second - 1;
      });
    }, 1000);
  };
  const resendOTP = () => {
    if (isOtpEditable) {
      mobile.onSubmit();
      onOtpSendSuccess();
    }
  };
  const handleEditMobile = () => {
    props.navigation.navigate('AuthLogin');
  };
  const remainingTime =
    seconds.toString().length === 1 ? `0${seconds}` : seconds;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={[
          Custompadding.paddingLarge,
          { backgroundColor: colors.white, flex: 1 },
        ]}
      >
        <Header
          heading="login"
          successText
          backCallback={() => {
            navigation.goBack();
          }}
        />
        <View
          style={[
            Custompadding.paddingTopLarge,
            Custompadding.paddingLeftRightLarge,
          ]}
        >
          <Text style={[typography.regular.h6, { lineHeight: 22 }]}>
            A login code was sent to you at
          </Text>
          <Text style={[typography.regular.h6, { lineHeight: 22 }]}>
            {phone}
          </Text>
          <TouchableOpacity onPress={handleEditMobile}>
            <Text
              style={[
                typography.regular.h7,
                {
                  // color: props.disabled ? colors.GREYS.C6 : colors.black,
                  textTransform: 'capitalize',
                  textDecorationLine: 'underline',
                },
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[Custompadding.paddingTopBottomLarge]}>
          <CustomInput
            placeholder="login code"
            onChangeText={otp.onChange}
            onBlur={otp.onBlur}
            value={otp.value}
            errorText={otp.error}
            keyboardType="number-pad"
            ref={otpRef}
            returnKeyType="done"
            onSubmitEditing={() => {
              if (Keyboard) Keyboard.dismiss();
              otp.onSubmit();
            }}
          />
        </View>
        <View>
          <Button
            type="secondary"
            title={mobile.isLoading || loginLoader ? 'Loading' : 'continue'}
            disable={mobile.isLoading || loginLoader}
            width={wp(80)}
            callback={otp.onSubmit}
          />
        </View>
        <View
          style={[
            Custompadding.paddingTopXLarge,
            Custompadding.paddingLeftRightLarge,
          ]}
        >
          <Text
            style={[
              typography.regular.h7,
              {
                // color: props.disabled ? colors.GREYS.C6 : colors.black,
                textTransform: 'capitalize',
              },
            ]}
          >
            Didn’t receive?
          </Text>
        </View>
        <TouchableOpacity
          style={[
            Custompadding.paddingTopRegular,
            Custompadding.paddingLeftRightLarge,
          ]}
          onPress={resendOTP}
        >
          <Text
            style={[
              typography.regular.h7,
              {
                // color: props.disabled ? colors.GREYS.C6 : colors.black,
                textTransform: 'capitalize',
                textDecorationLine: 'underline',
              },
            ]}
          >
            {isOtpEditable || remainingTime === '00'
              ? 'Resend Otp'
              : remainingTime !== '00'
              ? `resend in ${remainingTime} seconds`
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
OtpVerification.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default OtpVerification;
