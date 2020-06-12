/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, ScrollView, NativeModules, Alert, Platform } from 'react-native';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import auth, { firebase } from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { colors } from '../../styles/styleSheet';
import ButtonSection from '../sceneComponents/HomePage/ButtonSection';
import { BannerCarousel } from '../sceneComponents/HomePage/BannerCarousel';
import { wp } from '../../utils/Dimensions';
import { useLoginHook } from '../../app/shared/hooks';
const { RNTwitterSignIn } = NativeModules;

const HomePage = (props) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin, loginLoader } = useLoginHook(props, {
    onLoginSuccess,
    onLoginError,
  });

  function onLoginSuccess() {
    setShowAuthModal(false);
    // props.navigation.navigate('Landing');
  }
  function onLoginError(error) {
    console.log(error); // TODO handle error
  }

  RNTwitterSignIn.init(
    'rMTpFIQrtcJIygaGoVk3PPywm',
    'ZkE4JsYpY75RCSyYrpDaLPJX55A05KuQYlqpKlHJFtB66qBN77',
  ).then(() => console.log('Twitter SDK initialized'));

  async function signInWithCredential(credential, email) {
    setIsLoading(true);
    // login with credential
    // props.dispatch({
    //   type: 'UPDATE_AUTH_LISTENER',
    //   payload: {
    //     authListener: false,
    //   },
    // });
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((firebaseUserCredential) => {
        // firebaseUserCredential.user.linkWithCredential(credential);
        const fireBaseInfo = firebaseUserCredential.user._user;
        const {
          isNewUser,
          providerId,
        } = firebaseUserCredential.additionalUserInfo;
        if (isNewUser) {
          setShowAuthModal(false);
          props.navigation.navigate('Profile', {
            emailInfo: '',
            password: '',
            showEmail: true,
            showPhone: true,
          });
        } else {
          const provider = providerId.replace('.com', '');
          let profileID = '';
          if (fireBaseInfo.providerData && fireBaseInfo.providerData.length) {
            profileID = fireBaseInfo.providerData[0].uid;
          }
          const payload = {
            login_strategy: provider,
            [`${provider}_id`]: profileID,
            firebase_id: fireBaseInfo.uid,
          };
          onLogin(payload);
        }
        // props.dispatch({
        //   type: 'UPDATE_AUTH_LISTENER',
        //   payload: {
        //     authListener: true,
        //   },
        // });
        // if (displayName) {
        //   firebaseUserCredential.user.updateProfile({ displayName });
        // }
        setIsLoading(false);
      })
      .catch(async (error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          if (email) {
            firebase
              .auth()
              .fetchSignInMethodsForEmail(email)
              .then((providers) => {
                if (providers.includes('apple.com') && appleAuth.isSupported) {
                  Alert.alert(
                    'Sign-in via Apple',
                    "Looks like you previously signed in via Apple. You'll need to sign-in there to continue",
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Continue', onPress: () => onAppleLogin() },
                    ],
                  );
                } else if (providers.includes('google.com')) {
                  Alert.alert(
                    'Sign-in via Google',
                    "Looks like you previously signed in via Google. You'll need to sign-in there to continue",
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Continue',
                        onPress: () => onGoogleLogin(),
                      },
                    ],
                  );
                } else if (providers.includes('facebook.com')) {
                  Alert.alert(
                    'Sign-in via Facebook',
                    "Looks like you previously signed in via Facebook. You'll need to sign-in there to continue",
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Continue',
                        onPress: () => onFacebookLogin(),
                      },
                    ],
                  );
                } else if (providers.includes('twitter.com')) {
                  Alert.alert(
                    'Sign-in via Twitter',
                    "Looks like you previously signed in via Twitter. You'll need to sign-in there to continue",
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Continue',
                        onPress: () => onTwitterLogin(),
                      },
                    ],
                  );
                } else {
                  Alert.alert(
                    'Login Error',
                    'Sign in using a different provider',
                  );
                }
              });
          } else {
            Alert.alert(
              'Login Error',
              'Unable to sign in using account, could not determine email',
            );
          }
        } else {
          Alert.alert('Login Error', error.toString());
        }
        setIsLoading(false);
      });
  }

  async function onAppleLogin() {
    setIsLoading(true);
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    const { identityToken, fullName, email, nonce } = appleAuthRequestResponse;
    const displayName = `${fullName.givenName} ${fullName.familyName}`;

    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      setIsLoading(false);
      signInWithCredential(appleCredential, email, displayName);
    } else {
      setIsLoading(false);
      Alert.alert('Apple Sign-In Error', 'Unable to sign-in');
    }
  }

  async function getFacebookProfile() {
    return new Promise((resolve) => {
      const infoRequest = new GraphRequest(
        '/me?fields=email,name',
        null,
        (error, result) => {
          if (error) {
            console.log(`Error fetching data: ${error.toString()}`);
            resolve(null);
            return;
          }

          resolve(result);
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  async function onFacebookLogin() {
    setIsLoading(true);
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      setIsLoading(false);

      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      setIsLoading(false);

      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const profile = await getFacebookProfile();

    const { email, name } = profile;

    // Sign-in the user with the credential
    return signInWithCredential(facebookCredential, email, name);
  }

  async function onTwitterLogin() {
    setIsLoading(true);
    try {
      const {
        authToken,
        authTokenSecret,
        email,
      } = await RNTwitterSignIn.logIn();
      // Create a Twitter credential with the tokens
      const twitterCredential = auth.TwitterAuthProvider.credential(
        authToken,
        authTokenSecret,
      );
      setIsLoading(false);
      // Sign-in the user with the credential
      signInWithCredential(twitterCredential, email);
    } catch (error) {
      console.log(error, 'twitterError');
      setIsLoading(false);
    }
  }

  async function onGoogleLogin() {
    setIsLoading(true);
    try {
      await GoogleSignin.configure({
        offlineAccess: false,
        webClientId:
          Platform.OS === 'ios'
            ? '217276336937-nubehluhb1d104jlur06487da38pi26m.apps.googleusercontent.com'
            : '217276336937-vao50icsuomqbiuf6jvo1flmea031i6u.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signIn().then((data) => {
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          // data.accessToken,
        );

        // login with credential
        signInWithCredential(credential, data.user.email, data.user.name);
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error, 'googleError');
      }
      setIsLoading(false);
    }
  }

  const handleAuthMethod = (authType) => {
    switch (authType) {
      case 'facebook':
        onFacebookLogin();
        break;
      case 'twitter':
        onTwitterLogin();
        break;
      case 'google':
        onGoogleLogin();
        break;
      case 'apple':
        onAppleLogin();
        break;
      case 'phone_email':
        setShowAuthModal(false);
        props.navigation.navigate('AuthLogin');
        break;
      default:
    }
    return null;
  };
  const handleButtonClick = (clickType) => {
    setShowAuthModal(true);
    switch (clickType) {
      case 'startMission':
        break;
      case 'findMission':
        break;
      case 'signIn':
        break;
      default:
    }
    return null;
  };
  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'flex-start', flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ backgroundColor: colors.white, height: wp(130) }}>
          <BannerCarousel />
        </View>
        <View>
          <ButtonSection
            authCallback={(authType) => handleAuthMethod(authType)}
            onButtonClick={(clickType) => handleButtonClick(clickType)}
            showAuthModal={showAuthModal}
            closeCallback={() => {
              setIsLoading(false);
              setShowAuthModal(false);
            }}
            isLoading={isLoading || loginLoader}
          />
        </View>
      </ScrollView>
    </View>
  );
};

HomePage.propTypes = {
  navigation: PropTypes.object,
  // dispatch: PropTypes.func,
};

export default HomePage;
