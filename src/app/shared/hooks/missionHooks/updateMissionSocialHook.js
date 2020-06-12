/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState, useMemo, useEffect } from 'react';
import { NativeModules } from 'react-native';
import axios from 'axios';
import {
  LoginManager,
  // AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const { RNTwitterSignIn } = NativeModules;

const twitterBaseUrl = 'https://twitter.com/';
const instagramBaseUrl = 'https://www.instagram.com/';

export const useUpdateMissionSocialHook = (
  {
    Dash_hoc: {
      actions: { UPDATE_MISSION_API_CALL },
    },
    Dash_data: {
      UPDATE_MISSION_API,
      GET_MISSION_BY_ID_API,
      createMissionPayload: { social },
    },
    getData,
    dispatch,
  },
  { onSocialSuccess, onSocialError, missionId = null } = {},
) => {
  RNTwitterSignIn.init(
    'rMTpFIQrtcJIygaGoVk3PPywm',
    'ZkE4JsYpY75RCSyYrpDaLPJX55A05KuQYlqpKlHJFtB66qBN77',
  );

  const [instagramId, setInstagramId] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookId, setFacebookId] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [isLoading, setIsLoading] = useState('');

  useEffect(() => {
    if (!missionId && Object.keys(social).length) {
      setInstagramId(social.insta_token);
      setInstagramLink(social.insta_link);
      setFacebookId(social.facebook_token);
      setFacebookLink(social.facebook_link);
      setTwitterId(social.twitter_token);
      setTwitterLink(social.twitter_link);
    }
  }, [missionId, social]);

  const getInstagramUserProfile = async (token) => {
    const igBaseUrl = 'https://graph.instagram.com/me';
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const httpRequest = axios.create({
      baseURL: `${igBaseUrl}`,
      headers,
      method: 'get',
    });
    setIsLoading(true);
    httpRequest({
      params: { fields: 'id,username', access_token: token },
    })
      .then(({ data }) => {
        setIsLoading(false);
        setInstagramId(data.username);
        setInstagramLink(`${instagramBaseUrl}${data.username}`);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, 'instagram profile err');
      });
  };

  const handleLinkInstagram = (instagramData, results) => {
    getInstagramUserProfile(instagramData.access_token);
  };

  const handleLinkInstagramError = (errorData) => {
    console.log(errorData, 'errorData');
  };

  const handleInstagramCode = async (code, results) => {
    if (results.access_token) {
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      const http = axios.create({
        baseURL: 'https://api.instagram.com/oauth/access_token',
        headers,
      });
      const form = new FormData();
      form.append('app_id', '778236939249135');
      form.append('app_secret', 'd6c97470e4cec2ccbf8adaf8d8cbca24');
      form.append('grant_type', 'authorization_code');
      form.append(
        'redirect_uri',
        'https://charitable-9e5ea.firebaseapp.com/__/auth/handler',
      );
      form.append('code', code);
      setIsLoading(true);
      const res = await http.post('/', form).catch((error) => {
        console.log(error.response);
        setIsLoading(false);
        return false;
      });
      if (res) {
        setIsLoading(false);
        handleLinkInstagram(res.data, results);
      } else {
        setIsLoading(false);
        console.log(results);
      }
    } else {
      handleLinkInstagram(code, results);
    }
  };

  const handleLinkTwitter = async () => {
    setIsLoading(true);
    try {
      await RNTwitterSignIn.logIn()
        .then((data) => {
          // console.log(data, 'tw');
          // setTwitterId(data.userID);
          setTwitterId(data.userName);
          setTwitterLink(`${twitterBaseUrl}${data.userName}`);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, 'err');
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error, 'err');
      setIsLoading(false);
    }
  };

  async function getFacebookProfile() {
    return new Promise((resolve) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: 'email,name,link',
            },
          },
        },
        (error, result) => {
          if (error) {
            console.log(`Error fetching data: ${error.toString()}`);
            resolve(null);
            setIsLoading(false);
            return;
          }

          resolve(result);
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }

  const handleLinkFacebook = async () => {
    setIsLoading(true);
    try {
      await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'user_link',
      ])
        .then(async (data) => {
          console.log(data, 'fb data');
          // TODO handle declinedPermissions permissions
          if (data.isCancelled) {
            setIsLoading(false);
          }
          const profile = await getFacebookProfile();
          // console.log(profile, 'fb profile');
          setFacebookId(profile.email);
          setFacebookLink(profile.link);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, 'err');
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error, 'err');
      setIsLoading(false);
    }
  };

  const handelUpdateMissionSocialLinks = () => {
    const formError = [];

    if (!formError.length) {
      const payload = {
        insta_token: instagramId,
        insta_link: instagramLink,
        twitter_token: twitterId,
        twitter_link: twitterLink,
        facebook_token: facebookId,
        facebook_link: facebookLink,
      };
      if (!missionId) {
        dispatch({
          type: 'UPDATE_MISSION_PAYLOAD',
          payload: {
            key: 'social',
            data: payload,
          },
        });
        onSocialSuccess({ data: {} });
      } else {
        const params = { missionId };
        const formData = new FormData();
        Object.entries(payload).map(([key, value]) => {
          if (value) formData.append(key, value);
          return null;
        });
        UPDATE_MISSION_API_CALL({
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
              onSocialSuccess({ res, data, message, status });
            },
            errorCallback: ({ error, errorData, message, status, errors }) => {
              onSocialError({
                error,
                errorData,
                message,
                status,
                errors,
              });
            },
          },
        });
      }
    }
  };

  const updateSocial = useMemo(() => getData(UPDATE_MISSION_API, [], false), [
    UPDATE_MISSION_API,
  ]);

  const missionDetail = useMemo(() => {
    const missionInfo = getData(GET_MISSION_BY_ID_API, {}, false);
    if (missionInfo.data && Object.keys(missionInfo.data).length) {
      const missionData = missionInfo.data;
      setInstagramLink(missionData.insta_link);
      setFacebookLink(missionData.facebook_link);
      setTwitterLink(missionData.twitter_link);
      setInstagramId(missionData.insta_token);
      setFacebookId(missionData.facebook_token);
      setTwitterId(missionData.twitter_token);
    }
    return missionInfo;
  }, [GET_MISSION_BY_ID_API]);

  return {
    instagram: {
      id: instagramId,
      link: instagramLink,
      onLink: handleInstagramCode,
      onLinkError: handleLinkInstagramError,
    },
    twitter: {
      id: twitterId,
      link: twitterLink,
      onLink: handleLinkTwitter,
    },
    facebook: {
      id: facebookId,
      link: facebookLink,
      onLink: handleLinkFacebook,
    },
    updateSocial: {
      onSubmit: handelUpdateMissionSocialLinks,
      loader: updateSocial.loader,
      missionDetail,
    },
    socialLoader: isLoading,
  };
};
