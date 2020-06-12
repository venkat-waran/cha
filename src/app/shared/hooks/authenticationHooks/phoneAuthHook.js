/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';

export const usePhoneAuthHook = (
  {
    // eslint-disable-next-line no-unused-vars
    getData,
  },
  {
    onSuccessMobile,
    onErrorMobile,
    onSuccessOtp,
    onErrorOtp,
    phone = '',
    confirmResult = null,
  } = {},
) => {
  const [mobileNo, setMobileNo] = useState(phone || '');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [mobileNoError, setMobileNoError] = useState('');
  const [otpError, setOTPError] = useState('');

  const onChangeOtp = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (otpError) {
      setOTPError('');
    }
    setOtp(value);
  };

  const onBlurOtp = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(otp, 'otp');
      if (error) setOTPError(error);
    },
    [otp],
  );

  const onChangeMobile = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (mobileNoError) {
      setMobileNoError('');
    }
    // if (Number(value) === 0 || (Number(value) && value.length <= 15))
    setMobileNo(value);
  };

  const onBlurMobile = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(mobileNo, 'mobileNo');
      if (error) setMobileNoError(error);
    },
    [mobileNo],
  );

  const onTabChange = () => {
    setMobileNo('');
    setMobileNoError('');
  };

  async function handleSendCode() {
    const error = [];
    const isMobileError = validate(mobileNo, 'mobileNo');
    setOtp('');
    setOTPError('');
    if (isMobileError) {
      error.push(null);
      setMobileNoError(isMobileError);
    }

    if (!error.length) {
      setIsLoading(true);
      verifyOTPStatus();
      // auth()
      //   .signInWithPhoneNumber(mobileNo)
      //   .then((result) => {
      //     setIsLoading(false);
      //     onSuccessMobile(result);
      //   })
      //   .catch((err) => {
      //     setIsLoading(false);
      //     alert(err.message);
      //     onErrorMobile(err);
      //   });
    }
  }

  const verifyOTPStatus = () => {
    auth()
      .verifyPhoneNumber(mobileNo)
      .on(
        'state_changed',
        (phoneAuthSnapshot) => {
          switch (phoneAuthSnapshot.state) {
            case auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              setIsLoading(false);
              onSuccessMobile(phoneAuthSnapshot);
              break;
            // case auth.PhoneAuthState.ERROR: // or 'error'
            //   console.log('verification error');
            //   console.log(phoneAuthSnapshot.error);
            //   onErrorOtp(phoneAuthSnapshot.error);
            //   break;
            // ANDROID ONLY EVENTS
            case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              break;
            case auth.PhoneAuthState.AUTO_VERIFIED:
              {
                // or 'verified'
                console.log('verified');
                const { verificationId, code } = phoneAuthSnapshot;
                signInWithPhone(verificationId, code);
              }
              break;
            default:
              return null;
          }
          return null;
        },
        (error) => {
          // optionalErrorCb
          setIsLoading(false);
          onErrorMobile(error);
          onErrorOtp(error);
          console.log(error);
        },
        // eslint-disable-next-line no-unused-vars
        (phoneAuthSnapshot) => {
          // optionalCompleteCb
          setIsLoading(false);
          // console.log(phoneAuthSnapshot);
        },
      );
  };

  const signInWithPhone = async (verificationId, code) => {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    console.log(credential, 'credential');
    auth()
      .signInWithCredential(credential)
      .then((firebaseUserCredential) => {
        // firebaseUserCredential.user.linkWithCredential(credential);
        const fireBaseInfo = firebaseUserCredential.user._user;
        const { isNewUser } = firebaseUserCredential.additionalUserInfo;
        if (isNewUser) {
          onSuccessOtp('register');
        } else {
          const payload = {
            login_strategy: 'otp',
            phone: mobileNo,
            firebase_id: fireBaseInfo.uid,
          };
          onSuccessOtp('login', payload);
        }
        setIsLoading(false);
      })
      .catch(async (error) => {
        onErrorOtp(error);
        setIsLoading(false);
      });
  };

  async function handleVerifyCode() {
    const formError = [];
    const isOtpError = validate(otp, 'otp');
    if (isOtpError) {
      formError.push(null);
      setOTPError(isOtpError);
    }
    if (!formError.length) {
      setIsLoading(true);
      if (confirmResult) {
        const { verificationId } = confirmResult;
        signInWithPhone(verificationId, otp);
      }
    }
  }

  return {
    mobile: {
      value: mobileNo,
      onChange: onChangeMobile,
      onBlur: onBlurMobile,
      error: mobileNoError,
      onSubmit: handleSendCode,
      onTabChange,
      setLoader: (loader) => setIsLoading(loader),
      isLoading,
    },
    otp: {
      value: otp,
      onChange: onChangeOtp,
      error: otpError,
      onBlur: onBlurOtp,
      onSubmit: handleVerifyCode,
    },
  };
};

// Helpers
function getPlatformBasedFieldValue(e) {
  return typeof e === 'object' ? e.target.value : e;
}

function validate(value, fieldName) {
  switch (fieldName) {
    case 'mobileNo': {
      if (!value)
        return 'Enter Valid Mobile Number with county code Ex +111111111';
      // if (
      //   new RegExp(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/).test(value) ||
      //   value.search(/[a-zA-Z]/) !== -1
      // )
      //   return 'Enter Valid Mobile Number with county code Ex +111111111';
      // if (!new RegExp(/^\d{4,15}$/).test(value))
      //   return 'Mobile number should be 4-15 digits long, Ex +111111111';
      return '';
    }
    case 'otp': {
      if (!value) return 'Please enter the otp';
      if (value && value.length !== 6) return 'Please enter 6 Digit OTP';
      return '';
    }
    default:
      if (!value) return 'This field is required';
      return '';
  }
}
