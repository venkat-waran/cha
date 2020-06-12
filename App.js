/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
// import CustomStatusbar from './src/components/common/customStatusbar';
import HomePage from './src/components/scenes/HomePage';
import AuthLogin from './src/components/scenes/AuthLogin';
import OtpVerification from './src/components/scenes/OtpVerification';
import ForgotPassword from './src/components/scenes/ForgotPassword';
import Profile from './src/components/scenes/Profile';
import CreateMission from './src/components/scenes/CreateMission';
import About from './src/components/scenes/AboutSetup';
import Social from './src/components/scenes/SocialSetup';
import Content from './src/components/scenes/ContentSetup';
import Milestone from './src/components/scenes/Milestone';
import MissionPreview from './src/components/scenes/MissionPreview';
import PublishedMission from './src/components/scenes/PublishedMission';
import Landing from './src/components/scenes/Landing';
import MissionControl from './src/components/scenes/MissionControl';
import AccountBalance from './src/components/scenes/AccountBalance';
import Settings from './src/components/scenes/Settings';
import Notifications from './src/components/scenes/Notifications';
import FindMission from './src/components/scenes/FindMission';
import SearchMission from './src/components/scenes/SearchMission';
import ContributionHistory from './src/components/scenes/ContributionHistory';
import Dashboard from './src/components/scenes/Dashboard';
import SplashScreen from './src/components/scenes/SplashScreen';
import Location from './src/components/scenes/Location';
import { DashboardHoc } from './src/app/shared/Hoc';
import ToastContainer from './src/components/common/Toast';
// import { colors } from './src/styles/styleSheet';

const Stack = createStackNavigator();

// eslint-disable-next-line no-console
console.disableYellowBox = true;
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// GLOBAL.FormData = GLOBAL.originalFormData
//   ? GLOBAL.originalFormData
//   : GLOBAL.FormData;

const App = (props) => {
  const toastRef = React.createRef();
  const {
    Dash_data: { isLoggedIn, authListener },
    // Dash_hoc: { axios },
  } = props;

  const onAuthStateChanged = (user) => {
    // eslint-disable-next-line no-console
    // console.log(user, 'firebase user');
    props.dispatch({
      type: 'UPDATE_FIREBASE_PROFILE',
      payload: {
        // isLoggedIn: !!user,
        isInitialize: false,
        profile: user,
      },
    });
  };

  useEffect(() => {
    if (authListener) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }
    return null;
  }, []);

  function successToast(message, delay = 2000) {
    if (toastRef && toastRef.current) {
      // toastRef.current.props.style.backgroundColor = colors.GREEN.C1;
      toastRef.current.show(message, delay);
    }
  }
  function errorToast(message, delay = 2000) {
    if (toastRef && toastRef.current) {
      // toastRef.current.props.style.backgroundColor = 'red';
      toastRef.current.show(message, delay);
    }
  }

  const customProps = {
    ...props,
    successToast,
    errorToast,
  };

  return (
    <>
      <ToastContainer ref={toastRef} />
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={isLoggedIn ? 'Landing' : 'Home'}
          initialRouteName="SplashScreen"
          headerMode="none"
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Landing">
                {(navigationProps) => (
                  <Landing {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Profile">
                {(navigationProps) => (
                  <Profile {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="StartMission">
                {(navigationProps) => (
                  <CreateMission {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="About">
                {(navigationProps) => (
                  <About {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Social">
                {(navigationProps) => (
                  <Social {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Content">
                {(navigationProps) => (
                  <Content {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Milestone">
                {(navigationProps) => (
                  <Milestone {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Preview">
                {(navigationProps) => (
                  <MissionPreview {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Mission">
                {(navigationProps) => (
                  <PublishedMission {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="MissionControl">
                {(navigationProps) => (
                  <MissionControl {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="AccountBalance">
                {(navigationProps) => (
                  <AccountBalance {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Settings">
                {(navigationProps) => (
                  <Settings {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Notifications">
                {(navigationProps) => (
                  <Notifications {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="History">
                {(navigationProps) => (
                  <ContributionHistory {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="FindMission">
                {(navigationProps) => (
                  <FindMission {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="SearchMission">
                {(navigationProps) => (
                  <SearchMission {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Dashboard">
                {(navigationProps) => (
                  <Dashboard {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Location">
                {(navigationProps) => (
                  <Location {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="SplashScreen">
                {(navigationProps) => (
                  <SplashScreen {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Home">
                {(navigationProps) => (
                  <HomePage {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="AuthLogin">
                {(navigationProps) => (
                  <AuthLogin {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Otp">
                {(navigationProps) => (
                  <OtpVerification {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="ForgotPassword">
                {(navigationProps) => (
                  <ForgotPassword {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Profile">
                {(navigationProps) => (
                  <Profile {...customProps} {...navigationProps} />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

App.propTypes = {
  Dash_data: PropTypes.object,
  // Dash_hoc: PropTypes.object,
  dispatch: PropTypes.func,
};

export default DashboardHoc(App);
