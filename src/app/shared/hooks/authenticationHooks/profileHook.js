import { useState, useCallback, useMemo, useEffect } from 'react';
import { emailRegex } from '../../utils/regex';

export const useProfileHook = (
  // eslint-disable-next-line no-unused-vars
  {
    Dash_hoc: {
      actions: {
        GET_PROFILE_API_CALL,
        CREATE_PROFILE_API_CALL,
        UPDATE_PROFILE_API_CALL,
      },
    },
    Dash_data: {
      GET_PROFILE_API,
      CREATE_PROFILE_API,
      UPDATE_PROFILE_API,
      firebaseProfile = {},
      userProfile = {},
    },
    getData,
  },
  {
    onSuccess,
    onError,
    password = '',
    type = '',
    // isEdit = false
  } = {},
) => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [image, setImage] = useState('');
  const [imageFormData, setImageFormData] = useState('');

  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [imageError, setImageError] = useState('');
  const [isEmailDisabled, setIsEmailDisabled] = useState('');

  useEffect(() => {
    if (type === 'list') {
      getProfile();
    }
    return () => {
      // effect
    };
  }, [type]);

  useEffect(() => {
    // if (firebaseProfile.providerData) {
    //   providerData = firebaseProfile.providerData;
    // }
    // if (!isEdit) {
    //   if (firebaseProfile.displayName) {
    //     setName(firebaseProfile.displayName);
    //   }
    //   if (firebaseProfile.phoneNumber) {
    //     setMobileNo(firebaseProfile.phoneNumber);
    //   }
    //   if (firebaseProfile.email) {
    //     setEmailAddress(firebaseProfile.email);
    //   }
    // } else {
    setName(userProfile.name || firebaseProfile.displayName);
    setMobileNo(userProfile.phone || firebaseProfile.phoneNumber);
    setEmailAddress(userProfile.email || firebaseProfile.email);
    setPinCode(userProfile.zip_code);
    if (userProfile.profile_image) setImage({ uri: userProfile.profile_image });
    // }
    if (
      firebaseProfile &&
      firebaseProfile.providerData &&
      firebaseProfile.providerData.length
    ) {
      const { providerData } = firebaseProfile;

      if (providerData[0].providerId === 'phone') {
        setIsEmailDisabled(false);
      } else {
        setIsEmailDisabled(true);
      }
    }
  }, [firebaseProfile, userProfile]);

  const getProfile = (user) => {
    GET_PROFILE_API_CALL({
      request: {
        params: {
          userId: user,
        },
      },
    });
  };

  const onChangeName = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (nameError) {
      setNameError('');
    }
    setName(value);
  };

  const onBlurName = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(name, 'name');
      if (error) setNameError(error);
    },
    [name],
  );

  const onChangeMobile = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (mobileNoError) {
      setMobileNoError('');
    }
    // if (
    //   (Number(value) === 0 || Number(value)) &&
    //   value.length <= 15 &&
    //   !CREATE_PROFILE_API.loading.status
    // )
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

  const onChangePinCode = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (pinCodeError) {
      setPinCodeError('');
    }
    setPinCode(value);
  };

  const onBlurPinCode = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(pinCode, 'pinCode');
      if (error) setPinCodeError(error);
    },
    [pinCode],
  );

  const onChangeImage = (imageInfo, imageUri) => {
    if (imageUri) {
      setImageError('');
    }
    setImageFormData(imageInfo);
    setImage(imageUri);
  };
  const handelCreateProfile = () => {
    const formError = [];
    const isNameError = validate(name, 'name');
    const isMobileError = validate(mobileNo, 'mobileNo');
    const isEmailError = validate(emailAddress, 'emailAddress');
    const isPinCodeError = validate(pinCode, 'pinCode');
    // const isIamgeError = validate(image, 'image');
    if (isNameError) {
      formError.push(null);
      setNameError(isNameError);
    }
    if (isMobileError) {
      formError.push(null);
      setMobileNoError(isMobileError);
    }
    if (isEmailError) {
      formError.push(null);
      setEmailAddressError(isEmailError);
    }
    if (isPinCodeError) {
      formError.push(null);
      setPinCodeError(isPinCodeError);
    }
    // if (isIamgeError) {
    //   formError.push(null);
    //   setImageError(isIamgeError);
    // }

    if (
      !formError.length &&
      firebaseProfile &&
      firebaseProfile.providerData &&
      firebaseProfile.providerData.length
    ) {
      const { providerData } = firebaseProfile;
      const provider = providerData[0].providerId.replace('.com', '');
      const formData = new FormData();
      if (imageFormData && Object.keys(imageFormData).length)
        formData.append('profile_image', imageFormData);
      let strategy = '';

      if (providerData[0].providerId === 'phone') {
        strategy = 'otp';
      } else if (providerData[0].providerId === 'password') {
        strategy = 'otp';
      } else {
        strategy = providerData[0].providerId.replace('.com', '');
      }
      formData.append('signup_strategy', strategy);
      let providerId = `${provider}_id`;
      if (
        providerData[0].providerId === 'phone' ||
        providerData[0].providerId === 'password'
      ) {
        providerId = 'isDelete';
      }
      if (providerId !== 'isDelete')
        formData.append(`${providerId}`, providerData[0].uid);
      formData.append('name', name);
      formData.append('phone', mobileNo);
      formData.append('email', emailAddress);
      formData.append('zip_code', pinCode);
      formData.append('type_of_user', 'doner');
      formData.append('firebase_id', firebaseProfile.uid);

      if (providerData[0].providerId === 'password') {
        formData.append('password', password);
      }

      let params = {};
      let endPoint = '';
      if (userProfile && userProfile.id) {
        params = {
          userId: userProfile.id,
        };
        endPoint = UPDATE_PROFILE_API_CALL;
      } else {
        endPoint = CREATE_PROFILE_API_CALL;
      }
      endPoint({
        request: {
          payload: formData,
          params,
          axiosConfig: {
            headers: {
              'content-type': 'multipart/form-data',
              accept: 'application/json',
            },
          },
        },
        callback: {
          successCallback: ({ res, data, message, status }) => {
            getProfile(
              (data.data && data.data.user_data && data.data.user_data.id) ||
                (data.data && data.data.id),
            );
            onSuccess({ res, data, message, status });
          },
          errorCallback: ({
            error,
            errorData: responseErrorParser,
            message,
            status,
            errors,
          }) => {
            if (message) {
              alert(message.toString(message));
            } else {
              alert('Something went wrong');
            }
            onError({ error, responseErrorParser, message, status, errors });
          },
        },
      });
    }
  };

  const createProfile = useMemo(() => getData(CREATE_PROFILE_API, [], false), [
    CREATE_PROFILE_API,
  ]);
  const updateProfile = useMemo(() => getData(UPDATE_PROFILE_API, [], false), [
    CREATE_PROFILE_API,
  ]);
  const profileInfo = useMemo(() => getData(GET_PROFILE_API, [], false), [
    CREATE_PROFILE_API,
  ]);

  return {
    mobile: {
      value: mobileNo,
      onChange: onChangeMobile,
      onBlur: onBlurMobile,
      error: mobileNoError,
    },
    email: {
      value: emailAddress,
      onChange: onChangeEmailAddress,
      error: emailAddressError,
      onBlur: onBlurEmailAddress,
    },
    pinCode: {
      value: pinCode,
      onChange: onChangePinCode,
      error: pinCodeError,
      onBlur: onBlurPinCode,
    },
    image: {
      value: image,
      formData: imageFormData,
      onChange: onChangeImage,
      error: imageError,
      // onBlur: onBlurEmailAddress,
    },
    name: {
      value: name,
      onChange: onChangeName,
      error: nameError,
      onBlur: onBlurName,
    },
    onSubmit: handelCreateProfile,
    createProfile: createProfile.loader,
    updateProfile: updateProfile.loader,
    profileInfo: {
      data: profileInfo.data,
      loader: profileInfo.loader,
    },
    isEmailDisabled,
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
    case 'mobileNo': {
      if (!value) return 'Please enter your mobile number';
      // if (
      //   new RegExp(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/).test(value) ||
      //   value.search(/[a-zA-Z]/) !== -1
      // )
      //   return 'Only numbers are allowed';
      // if (!new RegExp(/^\d{4,15}$/).test(value))
      //   return 'Mobile number should be 4-15 digits long.';
      return '';
    }
    case 'pinCode': {
      if (!value) return 'Please enter the zipcode';
      if (value && value.length !== 5) return 'zipcode must be 5 Digit';
      return '';
    }
    case 'name': {
      if (!value) return 'Please enter your name';
      return '';
    }
    case 'emailAddress': {
      if (!value) return 'Please enter your email';
      if (value && !validateEmail(value)) return 'Invalid email address';
      return '';
    }
    default:
      if (!value) return 'This field is required';
      return '';
  }
}
