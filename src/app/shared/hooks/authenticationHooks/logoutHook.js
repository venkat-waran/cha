/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';
import { setJWTToken } from '../../utils/token';

export const useLogoutHook = ({
  Dash_data: { firebaseProfile = {} },
  Dash_hoc: { axios },
  dispatch,
}) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      if (
        firebaseProfile &&
        firebaseProfile._user &&
        firebaseProfile._user.providerData &&
        firebaseProfile._user.providerData.length &&
        firebaseProfile._user.providerData[0].providerId === 'google.com'
      ) {
        await GoogleSignin.configure({
          offlineAccess: false,
          webClientId:
            Platform.OS === 'ios'
              ? '217276336937-nubehluhb1d104jlur06487da38pi26m.apps.googleusercontent.com'
              : '217276336937-vao50icsuomqbiuf6jvo1flmea031i6u.apps.googleusercontent.com',
        });
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      auth()
        .signOut()
        .then(() => {
          // eslint-disable-next-line no-param-reassign
          delete axios.defaults.headers.common.Authorization;
          setJWTToken('');
          AsyncStorage.clear();
          dispatch({
            type: 'LOGOUT',
          });
          navigation.navigate('Home');
          // eslint-disable-next-line no-console
          console.log('User signed out!');
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return {
    onLogout: handleLogout,
  };
};
