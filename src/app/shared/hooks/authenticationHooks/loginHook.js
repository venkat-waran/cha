/* eslint-disable no-console */
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useLoginHook = (
  {
    Dash_hoc: {
      actions: { LOGIN_API_CALL, LOGIN_EMAIL_API_CALL, GET_PROFILE_API_CALL },
    },
    Dash_data: { LOGIN_API, LOGIN_EMAIL_API },
    getData,
  },
  { onLoginSuccess, onLoginError } = {},
) => {
  const navigation = useNavigation();
  const handleLogin = (payload, isEmail) => {
    let endPoint = LOGIN_API_CALL;
    if (isEmail) {
      endPoint = LOGIN_EMAIL_API_CALL;
    }
    endPoint({
      request: {
        payload,
      },
      callback: {
        successCallback: ({ res, data, message, status }) => {
          GET_PROFILE_API_CALL({
            request: {
              params: {
                userId: data.data.user_id || 88,
              },
            },
            callback: {
              successCallback: (profileData) => {
                if (!profileData.data.data.profile_complete) {
                  navigation.navigate('Profile', {
                    emailInfo: '',
                    password: '',
                    showEmail: true,
                    showPhone: true,
                  });
                } else {
                  navigation.navigate('Landing');
                }
              },
            },
          });
          onLoginSuccess({ res, data, message, status });
        },
        errorCallback: ({
          error,
          errorData: responseErrorParser,
          message,
          status,
          errors,
        }) => {
          // console.error(message);
          onLoginError({ error, responseErrorParser, message, status, errors });
        },
      },
    });
  };

  const logInInfo = useMemo(() => getData(LOGIN_API, [], false), [LOGIN_API]);
  const logInEmailInfo = useMemo(() => getData(LOGIN_EMAIL_API, [], false), [
    LOGIN_EMAIL_API,
  ]);

  return {
    onLogin: handleLogin,
    loginLoader: logInInfo.loader,
    loginEmailLoader: logInEmailInfo.loader,
  };
};
