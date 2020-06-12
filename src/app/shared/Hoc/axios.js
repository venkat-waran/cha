/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
import axios from 'axios';

import promise from 'promise';
import BASE_URL from '../utils/BaseUrl';
import { setJWTToken, getJWTToken } from '../utils/token';
const request = axios;
// request.defaults.withCredentials = true;
request.interceptors.request.use(
  async (config) => {
    if (!config.baseURL) {
      request.defaults.baseURL = BASE_URL;
      config.baseURL = BASE_URL; // eslint-disable-line no-param-reassign
    }
    if (!config.headers.Authorization) {
      // setting token if it not present
      const userInfo = await getJWTToken();
      if (userInfo && Object.keys(userInfo).length)
        request.defaults.headers.common.Authorization = `JWT ${userInfo.token}`;
    }
    return config;
  },
  (error) => promise.reject(error),
);

// eslint-disable-next-line arrow-body-style
// add more urls based on api to update urls
request.interceptors.response.use(
  (response) => {
    // if (response.config.url === BASE_URL + authentication.VERIFY_OTP_API.url) {
    if (
      response.config.url.includes('user/create/profile') ||
      response.config.url.includes('user/login')
    ) {
      request.defaults.headers.common.Authorization = `JWT ${response.data.token}`;

      try {
        const userInfo = {
          token: response.data.token,
          userId: response.data.user_id || response.data.user_data.id,
        };
        setJWTToken(userInfo);
      } catch (error) {
        // console.log('error while setting token in storage', error);
      }
    }
    return response;
  },
  (error) =>
    // Handle your common errors here
    Promise.reject(error),
);

export default request;
