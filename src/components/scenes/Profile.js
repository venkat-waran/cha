import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from '../common/modal';
import Header from '../common/header';
import CustomInput from '../common/CustomTextField';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import profile from '../../assets/images/dummy-profile.png';
import camera from '../../assets/images/camera-icon.png';
import gallery from '../../assets/images/gallery.png';
import { wp, hp } from '../../utils/Dimensions';
import { useProfileHook } from '../../app/shared/hooks';

const Profile = (props) => {
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const pinCodeRef = useRef(null);

  const { route } = props;
  const { password = '', isEdit } = route.params;
  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);
  const {
    name,
    mobile,
    email,
    pinCode,
    image,
    onSubmit,
    createProfile,
    isEmailDisabled,
  } = useProfileHook(props, {
    onSuccess,
    onError,
    password,
    isEdit,
  });

  function onSuccess() {
    props.navigation.navigate('Landing');
  }
  function onError() {
    // props.navigation.navigate('Landing'); // TODO handle error
  }

  const uploadFile = (uploadType) => {
    const options = {
      multiple: false,
      mediaType: 'photo',
    };
    (uploadType === 'picker' ? ImagePicker.openPicker : ImagePicker.openCamera)(
      options,
    )
      .then((imageData) => {
        const imageInfo = {
          name: Platform.OS === 'ios' ? imageData.filename : 'Mission',
          type: imageData.mime,
          // ext: imageData.type ? imageData.type : imageData.path.split('.')[1],
          uri: imageData.path,
        };
        image.onChange(imageInfo, { uri: imageData.path });
        setUploadOptionsVisible(false);
      })
      .catch((e) => {
        setUploadOptionsVisible(false);
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={[Custompadding.paddingLarge, { flex: 1 }]}>
          <Header
            heading="setup your profile"
            rightHeading={createProfile ? 'Submitting' : 'done'}
            successText
            backCallback={() => {
              props.navigation.goBack();
            }}
            textCallback={onSubmit}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: wp(8.5),
            }}
          >
            <ImageWrapper
              style={{ height: wp(32), width: wp(32), marginBottom: wp(5.8) }}
            >
              <Image
                source={image.value || profile}
                alt="placeholder"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            </ImageWrapper>
            <TouchableOpacity
              style={{
                backgroundColor: colors.GREYS.C7,
                paddingHorizontal: wp(6.93),
                paddingVertical: wp(3.2),
                borderRadius: 22,
              }}
              // onPress={() => {
              //   uploadFile('cam');
              // }}
              onPress={() => setUploadOptionsVisible(true)}
            >
              <Text style={[typography.regular.h7]}>Change picture</Text>
            </TouchableOpacity>
            {image.error ? (
              <Text
                style={[
                  typography.regular.h7,
                  { color: colors.error, paddingTop: 10 },
                ]}
              >
                Please upload image
              </Text>
            ) : null}
          </View>
          <View style={[Custompadding.paddingBottomRegular]}>
            <CustomInput
              ref={nameRef}
              returnKeyType="next"
              placeholder="name"
              onChangeText={name.onChange}
              onBlur={name.onBlur}
              value={name.value}
              errorText={name.error}
              onSubmitEditing={() => {
                if (isEmailDisabled) {
                  mobileRef.current.focus();
                } else {
                  emailRef.current.focus();
                }
              }}
            />
          </View>
          <View style={[Custompadding.paddingBottomRegular]}>
            <CustomInput
              ref={mobileRef}
              placeholder="phone"
              onChangeText={mobile.onChange}
              onBlur={mobile.onBlur}
              value={mobile.value}
              errorText={mobile.error}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={() => pinCodeRef.current.focus()}
              disabled={!isEmailDisabled}
            />
          </View>
          <View style={[Custompadding.paddingBottomRegular]}>
            <CustomInput
              ref={emailRef}
              returnKeyType="next"
              placeholder="email"
              onChangeText={email.onChange}
              onBlur={email.onBlur}
              value={email.value}
              errorText={email.error}
              disabled={isEmailDisabled}
              onSubmitEditing={() => pinCodeRef.current.focus()}
            />
          </View>
          <View style={[Custompadding.paddingBottomRegular]}>
            <CustomInput
              ref={pinCodeRef}
              returnKeyType="done"
              placeholder="zipcode"
              onChangeText={pinCode.onChange}
              onBlur={pinCode.onBlur}
              value={pinCode.value}
              errorText={pinCode.error}
              keyboardType="numeric"
              onSubmitEditing={() => {
                if (Keyboard) Keyboard.dismiss();
                onSubmit();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        visible={uploadOptionsVisible}
        closeCallback={() => setUploadOptionsVisible(false)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 30,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
            }}
            onPress={() => {
              uploadFile('picker');
            }}
          >
            <View style={{ width: wp(8), height: hp(8) }}>
              <Image
                source={gallery}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Text
              style={[
                typography.bold.h4,
                {
                  lineHeight: wp(7.2),
                  textTransform: 'capitalize',
                },
              ]}
            >
              upload photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
            }}
            onPress={() => {
              uploadFile('cam');
            }}
          >
            <View style={{ width: wp(8), height: hp(8) }}>
              <Image
                source={camera}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Text
              style={[
                typography.bold.h4,
                {
                  lineHeight: wp(7.2),
                  textTransform: 'capitalize',
                },
              ]}
            >
              Take photo
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
Profile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Profile;
// const Container = styled.View`
//   background-color: ${colors.white};
//   flex: 1;
// `;
const ImageWrapper = styled.View`
  background-color: ${colors.GREYS.C7};
  border-radius: 100px;
`;
