// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const getJWTToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token !== null ? JSON.parse(token) : null;
  // return token;
};

// export const setJWTToken = (token) => {
//   const userInfo = JSON.stringify(token);
//   AsyncStorage.setItem('token', userInfo);
// };

export const setJWTToken = async (token) => {
  try {
    const userInfo = JSON.stringify(token);
    await AsyncStorage.setItem('token', userInfo);
  } catch (e) {
    // saving error
  }
};

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem('userId');
  return userId;
};
export const setUserId = (userId) => {
  AsyncStorage.setItem('userId', userId);
};
