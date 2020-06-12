/* eslint-disable no-console */
import { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import { emailRegex } from '../../utils/regex';

export const useEmailHook = (
  {
    // eslint-disable-next-line no-unused-vars
    getData,
  },
  { onSuccessEmail, onErrorEmail } = {},
) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailAddressError, setEmailAddressError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeEmailAddress = useCallback(
    (e) => {
      const value = getPlatformBasedFieldValue(e);
      setEmailAddress(value ? value.replace(/\s*$/, '') : '');
      if (emailAddressError) setEmailAddressError('');
    },
    [emailAddressError],
  );

  const onBlurEmailAddress = useCallback(
    (e) => {
      e.preventDefault();
      const emailError = validate(emailAddress, 'emailAddress');
      if (emailError) setEmailAddressError(emailError);
    },
    [emailAddress],
  );

  const onChangePassword = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (passwordError) {
      setPasswordError('');
    }
    setPassword(value);
  };

  const onBlurPassword = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(password, 'password');
      if (error) setPasswordError(error);
    },
    [password],
  );

  const onTabChange = () => {
    setEmailAddress('');
    setPassword('');
    setEmailAddressError('');
    setPasswordError('');
  };

  async function handleRegisterEmail() {
    const error = [];
    const isEmailError = validate(emailAddress, 'emailAddress');
    const isPasswordError = validate(password, 'password');

    if (isEmailError) {
      error.push(null);
      setEmailAddressError(isEmailError);
    }
    if (isPasswordError) {
      error.push(null);
      setPasswordError(isPasswordError);
    }

    if (!error.length) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(emailAddress, password)
        .then((result) => {
          setIsLoading(false);
          onSuccessEmail(result);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.code === 'auth/email-already-in-use') {
            handleLoginEmail();
            // setEmailAddressError('email address is already in use!');
          }

          if (err.code === 'auth/invalid-email') {
            setEmailAddressError('email address is invalid!');
          }
          onErrorEmail(err);
        });
    }
  }
  async function handleLoginEmail() {
    const error = [];
    const isEmailError = validate(emailAddress, 'emailAddress');
    const isPasswordError = validate(password, 'password');

    if (isEmailError) {
      error.push(null);
      setEmailAddressError(isEmailError);
    }
    if (isPasswordError) {
      error.push(null);
      setPasswordError(isPasswordError);
    }

    if (!error.length) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(emailAddress, password)
        .then((result) => {
          setIsLoading(false);
          onSuccessEmail(result);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.code === 'auth/invalid-email') {
            setEmailAddressError('email address is invalid!');
          } else if (err.code === 'auth/user-not-found') {
            setEmailAddressError('User with this email address is not found!');
          } else if (err.code === 'auth/wrong-password') {
            setPasswordError(err.toString(err));
          } else {
            setEmailAddressError(err.toString(err));
          }
          onErrorEmail(err);
        });
    }
  }

  const handlePasswordReset = async () => {
    const formError = [];
    const isEmailError = validate(emailAddress, 'emailAddress');

    if (isEmailError) {
      formError.push(null);
      setEmailAddressError(isEmailError);
    }

    if (!formError.length) {
      setIsLoading(true);
      try {
        auth()
          .sendPasswordResetEmail(emailAddress)
          .then(() => {
            setIsLoading(false);
            onSuccessEmail();
          })
          .catch((err) => {
            setIsLoading(false);
            onErrorEmail(err);
          });
      } catch (error) {
        setIsLoading(false);
        onErrorEmail(error);
      }
    }
  };

  return {
    email: {
      value: emailAddress,
      onChange: onChangeEmailAddress,
      onBlur: onBlurEmailAddress,
      error: emailAddressError,
      onRegister: handleRegisterEmail,
      onLogin: handleLoginEmail,
      onTabChange,
      setLoader: (loader) => setIsLoading(loader),
      isLoading,
      resetPassword: handlePasswordReset,
    },
    password: {
      value: password,
      onChange: onChangePassword,
      error: passwordError,
      onBlur: onBlurPassword,
    },
  };
};

// Helpers
function getPlatformBasedFieldValue(e) {
  return typeof e === 'object' ? e.target.value : e;
}
function validateEmail(email) {
  return emailRegex.test(String(email).toLowerCase());
}

function validate(value, fieldName) {
  switch (fieldName) {
    case 'emailAddress': {
      if (!value) return 'Please enter your email';
      if (value && !validateEmail(value)) return 'Invalid email address';
      return '';
    }
    case 'password': {
      if (!value) return 'Please enter password';
      if (value && value.length < 6)
        return 'Password must be minimum of 6 characters';
      return '';
    }
    default:
      if (!value) return 'This field is required';
      return '';
  }
}
