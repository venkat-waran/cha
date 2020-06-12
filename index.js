/* eslint-disable react/jsx-props-no-spreading */
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store as configureStore } from 'react-boilerplate-redux-saga-hoc';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import { name as appName } from './app.json';

const initialState = {};

const store = configureStore(initialState);

AppRegistry.registerComponent(appName, () => (props) => (
  <SafeAreaProvider>
    <Provider store={store}>
      <App {...props} />
    </Provider>
  </SafeAreaProvider>
));
