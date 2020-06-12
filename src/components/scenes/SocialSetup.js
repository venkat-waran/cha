/* eslint-disable no-console */
import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import InstagramLogin from 'react-native-instagram-login';
import Header from '../common/header';
import Loader from '../common/Loader';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp, hp } from '../../utils/Dimensions';
import { GetIcon } from '../../utils/Icons';
import puppy from '../../assets/images/puppy.png';
import {
  useUpdateMissionSocialHook,
  useMissionDetailHook,
} from '../../app/shared/hooks';

const Social = (props) => {
  const instagramRef = useRef(null);
  const {
    route: { params: { missionId = null } = {} },
  } = props;

  const {
    instagram,
    twitter,
    facebook,
    updateSocial: { onSubmit, loader: updateLoader },
    socialLoader,
  } = useUpdateMissionSocialHook(props, {
    onSocialSuccess,
    onSocialError,
    missionId,
  });

  const {
    missionDetail: { loader: detailLoader },
  } = useMissionDetailHook(props, {
    missionId,
  });

  function onSocialSuccess({ data = {} }) {
    if (!missionId) {
      let mission = '';
      if (data && data.data && data.data.id) {
        mission = data.data.id;
      }
      props.navigation.navigate('Content', {
        missionId: mission,
      });
    } else {
      props.navigation.navigate('MissionControl');
    }
  }
  function onSocialError() {}

  const setIgToken = (code, results) => {
    handleInstagramCode(code, results);
  };

  const handleInstagramCode = async (code, results) => {
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
    const res = await http.post('/', form).catch((error) => {
      console.log(error.response);
      return false;
    });
    if (res) {
      instagram.onLink(res.data, results);
    } else {
      console.log(results);
    }
  };

  let textLabel = 'Next';
  if (!missionId) {
    textLabel = 'Next';
  } else if (socialLoader) {
    textLabel = 'Linking';
  } else if (missionId && !updateLoader) {
    textLabel = 'Save';
  } else if (missionId && updateLoader) {
    textLabel = 'Saving';
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={[
          Custompadding.paddingLeftRightLarge,
          Custompadding.paddingTopLarge,
        ]}
      >
        <Header
          heading="social"
          rightHeading={textLabel}
          backCallback={() => {
            props.navigation.goBack();
          }}
          textCallback={
            !detailLoader || !socialLoader || !updateLoader ? onSubmit : null
          }
        />
        <View
          style={[
            Custompadding.paddingTopRegular,
            Custompadding.paddingBottomLarge,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Progress.Bar
            progress={0.4}
            width={wp(55.73)}
            height={wp(2.4)}
            color={colors.GREEN.C1}
            unfilledColor={colors.GREYS.C7}
            borderWidth={1}
            borderColor={colors.GREYS.C7}
            borderRadius={7}
          />
        </View>
      </View>
      {socialLoader || detailLoader || updateLoader ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container style={[Custompadding.paddingTopBottomLarge]}>
            <ImageBackground
              source={puppy}
              alt="location"
              style={{
                height: hp(80),
                width: wp(100),
                position: 'relative',
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                justifyContent: 'flex-end',
                alignSelf: 'center',
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  instagramRef.current.show();
                }}
                style={{ flexDirection: 'row' }}
              >
                <Text
                  style={[
                    typography.regular.h5,
                    {
                      lineHeight: 20,
                      marginBottom: instagram.link ? wp(1) : wp(9.86),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  link instagram
                </Text>
                {instagram.link ? (
                  <Text style={{ marginLeft: wp(4) }}>
                    {GetIcon('check|FontAwesome5', colors.GREEN.C5, wp(6))}
                  </Text>
                ) : null}
              </TouchableOpacity>
              {instagram.link ? (
                <Text
                  style={[
                    typography.regular.h7,
                    {
                      lineHeight: 20,
                      marginBottom: wp(5.33),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  {`@${instagram.id}`}
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={twitter.onLink}
                style={{ flexDirection: 'row' }}
              >
                <Text
                  style={[
                    typography.regular.h5,
                    {
                      lineHeight: 20,
                      marginBottom: twitter.link ? wp(1) : wp(9.86),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  link twitter
                </Text>
                {twitter.link ? (
                  <Text style={{ marginLeft: wp(4) }}>
                    {GetIcon('check|FontAwesome5', colors.GREEN.C5, wp(6))}
                  </Text>
                ) : null}
              </TouchableOpacity>
              {twitter.link ? (
                <Text
                  style={[
                    typography.regular.h7,
                    {
                      lineHeight: 20,
                      marginBottom: wp(5.33),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  {`@${twitter.id}`}
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={facebook.onLink}
                style={{ flexDirection: 'row' }}
              >
                <Text
                  style={[
                    typography.regular.h5,
                    {
                      lineHeight: 20,
                      marginBottom: facebook.link ? wp(1) : wp(9.86),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  link facebook page
                </Text>
                {facebook.link ? (
                  <Text style={{ marginLeft: wp(4) }}>
                    {GetIcon('check|FontAwesome5', colors.GREEN.C5, wp(6))}
                  </Text>
                ) : null}
              </TouchableOpacity>
              {facebook.link ? (
                <Text
                  style={[
                    typography.regular.h5,
                    {
                      lineHeight: 20,
                      marginBottom: wp(5.33),
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  {`${facebook.id}`}
                </Text>
              ) : null}
            </View>
          </Container>
          <InstagramLogin
            ref={instagramRef}
            appId="778236939249135"
            appSecret="d6c97470e4cec2ccbf8adaf8d8cbca24"
            redirectUrl="https://charitable-9e5ea.firebaseapp.com/__/auth/handler"
            scopes={['user_profile', 'user_media']}
            // scopes={['basic']}
            onLoginSuccess={setIgToken}
            onLoginFailure={(data) => instagram.onLinkError(data)}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
Social.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Social;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 0.9;
`;
