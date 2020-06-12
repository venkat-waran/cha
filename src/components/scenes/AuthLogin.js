import React, { useState, useRef } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabs from '../common/tabs';
import CustomInput from '../common/CustomTextField';
import Button from '../common/button';
import Header from '../common/header';
import {
  colors,
  Custompadding,
  // typography
} from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import {
  usePhoneAuthHook,
  useEmailHook,
  useLoginHook,
} from '../../app/shared/hooks';
const tabItems = [
  {
    value: 'phone',
    key: 'phone',
  },
  {
    value: 'email',
    key: 'email',
  },
];
const AuthLogin = (props) => {
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].key);
  // const [isRegister, setIsRegister] = useState(false);
  const { mobile } = usePhoneAuthHook(props, {
    onSuccessMobile,
    onErrorMobile,
    onSuccessOtp,
    onErrorOtp,
    navigation: props.navigation,
  });
  const { email, password } = useEmailHook(props, {
    onSuccessEmail,
    onErrorEmail,
  });
  const { onLogin, loginLoader, loginEmailLoader } = useLoginHook(props, {
    onLoginSuccess,
    onLoginError,
  });
  function onSuccessMobile(result) {
    if (result)
      props.navigation.navigate('Otp', {
        phone: mobile.value,
        confirmResult: result,
      });
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
  function onSuccessEmail(result) {
    if (result.additionalUserInfo.isNewUser) {
      props.navigation.navigate('Profile', {
        emailInfo: email.value,
        password: password.value,
        showEmail: false,
        showPhone: true,
      });
    } else {
      const payload = {
        email: email.value,
        password: password.value,
      };
      onLogin(payload, true);
    }
  }
  function onErrorEmail(error) {
    // eslint-disable-next-line no-console
    console.log(error.message, 'email err'); // TODO handle error
  }
  function onLoginSuccess() {
    // props.navigation.navigate('Landing');
  }
  function onLoginError(error) {
    // eslint-disable-next-line no-console
    console.log(error); // TODO handle error
  }
  const handleTabClick = (clickedTab) => {
    if (
      // !mobile.isLoading &&
      // !email.isLoading &&
      clickedTab.key !== activeTab.key
    ) {
      mobile.onTabChange();
      email.onTabChange();
      mobile.setLoader(false);
      email.setLoader(false);
      setActiveTab(clickedTab.key);
    }
  };
  // const handleForgotPassword = () => {
  //   props.navigation.navigate('ForgotPassword');
  // };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={[
          Custompadding.paddingLarge,
          { backgroundColor: colors.white, flex: 1 },
        ]}
      >
        <Header
          // heading={
          //   activeTab.key === 'phone' || !isRegister ? 'login' : 'register'
          // }
          heading="login"
          successText
          backCallback={() => {
            props.navigation.goBack();
          }}
        />
        <Tabs
          details={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        {activeTab === 'phone' ? (
          <>
            <View style={[Custompadding.paddingTopBottomLarge]}>
              <CustomInput
                placeholder="phone with country code"
                onChangeText={mobile.onChange}
                onBlur={mobile.onBlur}
                value={mobile.value}
                errorText={mobile.error}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={() => {
                  if (Keyboard) Keyboard.dismiss();
                  mobile.onSubmit();
                }}
                ref={phoneRef}
              />
            </View>
            <Button
              type="secondary"
              title={mobile.isLoading || loginLoader ? 'Loading' : 'continue'}
              disable={mobile.isLoading || loginLoader}
              width={wp(80)}
              callback={mobile.onSubmit}
            />
          </>
        ) : (
          <>
            <View style={[Custompadding.paddingTopBottomLarge]}>
              <CustomInput
                placeholder="Email"
                onChangeText={email.onChange}
                onBlur={email.onBlur}
                value={email.value}
                errorText={email.error}
                keyboardType="email-address"
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={() => {
                  if (passwordRef.current) passwordRef.current.focus();
                }}
              />
            </View>
            <View style={[Custompadding.paddingTopBottomLarge]}>
              <CustomInput
                placeholder="Password"
                onChangeText={password.onChange}
                onBlur={password.onBlur}
                value={password.value}
                errorText={password.error}
                secureTextEntry
                returnKeyType="done"
                ref={passwordRef}
                onSubmitEditing={email.onRegister}
              />
            </View>
            <Button
              type="secondary"
              width={wp(80)}
              // callback={isRegister ? email.onRegister : email.onLogin}
              callback={email.onRegister}
              title={
                email.isLoading || loginEmailLoader ? 'Loading' : 'continue'
              }
              disable={email.isLoading || loginEmailLoader}
            />
            {/* <View
              style={[
                Custompadding.paddingTopLarge,
                Custompadding.paddingLeftRightLarge,
              ]}
            >
              <TouchableOpacity onPress={handleForgotPassword}>
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
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

AuthLogin.propTypes = {
  navigation: PropTypes.object,
};

export default AuthLogin;
