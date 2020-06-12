/* eslint-disable indent */
import React, { useState, useRef, Keyboard } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ImagePicker from 'react-native-image-crop-picker';
import TagInput from 'react-native-tags-input';
import Loader from '../common/Loader';
import Header from '../common/header';
import CustomInput from '../common/CustomTextField';
import Modal from '../common/modal';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp, hp } from '../../utils/Dimensions';
import { GetIcon } from '../../utils/Icons';
import camera from '../../assets/images/camera-icon.png';
import gallery from '../../assets/images/gallery.png';
import {
  useCreateMissionHook,
  useMissionDetailHook,
  // useCategoriesHook,
} from '../../app/shared/hooks';

const About = (props) => {
  const titleRef = useRef(null);
  const shortDescRef = useRef(null);
  const longDescRef = useRef(null);
  const pinCodeRef = useRef(null);
  const tagRef = useRef(null);
  const locationRef = useRef(null);
  const categoryRef = useRef(null);

  const {
    route: {
      params: { missionId = null, locationInfo, selectedCategory } = {},
    },
  } = props;

  const [uploadOptionsVisible, setUploadOptionsVisible] = useState(false);
  const {
    title,
    shortDescription,
    longDescription,
    pinCode,
    image,
    tags,
    searchText,
    category,
    createMission: { onSubmit, loader: createLoader },
  } = useCreateMissionHook(props, {
    onMissionSuccess,
    onMissionError,
    missionId,
    locationInfo,
    selectedCategory,
  });

  const {
    missionDetail: { loader: detailLoader },
  } = useMissionDetailHook(props, {
    missionId,
  });

  // const {
  //   categories: { selected },
  // } = useCategoriesHook(props, { selected: category });

  function onMissionSuccess({ data = {} }) {
    if (!missionId) {
      let mission = '';
      if (data && data.data && data.data.id) {
        mission = data.data.id;
      }
      props.navigation.navigate('Social', {
        missionId: mission,
      });
    } else {
      props.navigation.navigate('MissionControl');
    }
  }
  function onMissionError() {}

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

  let textLabel = 'Next';
  if (missionId) {
    textLabel = 'Save';
  }

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
        <View
          style={[
            Custompadding.paddingLeftRightLarge,
            Custompadding.paddingTopLarge,
          ]}
        >
          <Header
            heading="about"
            rightHeading={createLoader ? 'Saving' : textLabel}
            backCallback={() => {
              props.navigation.goBack();
            }}
            textCallback={!createLoader || !detailLoader ? onSubmit : null}
          />
          <View
            style={[
              Custompadding.paddingTopRegular,
              Custompadding.paddingBottomLarge,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Progress.Bar
              progress={0.2}
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
        {detailLoader || createLoader ? (
          <Loader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container style={[Custompadding.paddingTopBottomLarge]}>
              <View>
                <ImageWrapper
                  style={{
                    height: wp(80),
                    width: wp(100),
                    marginBottom: wp(5.33),
                    position: 'relative',
                  }}
                >
                  <Image
                    source={image.value || camera}
                    alt="about"
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </ImageWrapper>
                <TouchableOpacity
                  style={[
                    Custompadding.paddingSmall,
                    {
                      position: 'absolute',
                      bottom: 40,
                      right: 20,
                      backgroundColor: colors.GREYS.C9,
                      borderWidth: 4,
                      borderColor: colors.GREYS.C8,
                      borderRadius: 12,
                    },
                  ]}
                  onPress={() => setUploadOptionsVisible(true)}
                >
                  {GetIcon('upload|FontAwesome5', colors.white, wp(8))}
                </TouchableOpacity>
                {image.error ? (
                  <Text
                    style={[
                      typography.regular.h7,
                      { color: colors.error, paddingTop: 10 },
                    ]}
                  >
                    {image.error}
                  </Text>
                ) : null}
              </View>
              <View style={[Custompadding.paddingLeftRightRegular]}>
                <View style={[Custompadding.paddingBottomRegular]}>
                  <CustomInput
                    placeholder="mission title"
                    onChangeText={title.onChange}
                    onBlur={title.onBlur}
                    value={title.value}
                    errorText={title.error}
                    ref={titleRef}
                    returnKeyType="next"
                    onSubmitEditing={() => categoryRef.current.focus()}
                  />
                </View>
                <>
                  {!missionId && (
                    <View style={[Custompadding.paddingBottomRegular]}>
                      <CustomInput
                        isNavigateInput
                        placeholder="Select Category"
                        onFocus={() => {
                          props.navigation.navigate('SearchMission', {
                            redirectTo: 'About',
                            showSearch: false,
                            title: 'Select Category',
                          });
                        }}
                        value={category.value.name}
                        errorText={category.error}
                        ref={categoryRef}
                        returnKeyType="next"
                        onSubmitEditing={() => locationRef.current.focus()}
                      />
                    </View>
                  )}
                  <View style={[Custompadding.paddingBottomRegular]}>
                    <CustomInput
                      isNavigateInput
                      placeholder="Mission Location"
                      onFocus={() => {
                        props.navigation.navigate('Location', {
                          redirectTo: 'About',
                        });
                      }}
                      // onChangeText={searchText.onChange}
                      value={searchText.value}
                      errorText={searchText.error}
                      ref={locationRef}
                      returnKeyType="next"
                      onSubmitEditing={() => pinCodeRef.current.focus()}
                    />
                  </View>
                </>
                <View style={[Custompadding.paddingBottomRegular]}>
                  <CustomInput
                    placeholder="zipcode"
                    onChangeText={pinCode.onChange}
                    onBlur={pinCode.onBlur}
                    value={pinCode.value}
                    errorText={pinCode.error}
                    keyboardType="numeric"
                    ref={pinCodeRef}
                    returnKeyType="done"
                    onSubmitEditing={() => shortDescRef.current.focus()}
                  />
                </View>
                <View
                  style={[
                    Custompadding.paddingBottomRegular,
                    // { backgroundColor: 'yellow' },
                  ]}
                >
                  <CustomInput
                    characterRestriction={140}
                    placeholder="brief description"
                    rightText={shortDescription.maxLength || '0'}
                    onChangeText={shortDescription.onChange}
                    onBlur={shortDescription.onBlur}
                    value={shortDescription.value}
                    errorText={shortDescription.error}
                    // multiline
                    ref={shortDescRef}
                    returnKeyType="next"
                    onSubmitEditing={() => longDescRef.current.focus()}
                  />
                </View>
                <View>
                  <CustomInput
                    placeholder="long description(optional)"
                    onChangeText={longDescription.onChange}
                    onBlur={longDescription.onBlur}
                    value={longDescription.value}
                    errorText={longDescription.error}
                    // multiline
                    ref={longDescRef}
                    returnKeyType="next"
                    onSubmitEditing={() => tagRef.current.focus()}
                  />
                </View>
              </View>
              <View style={[Custompadding.paddingBottomRegular]}>
                <TagInput
                  updateState={tags.onChange}
                  tags={tags.value}
                  placeholder="Tags"
                  placeholderTextColor="#707070"
                  leftElementContainerStyle={{ marginLeft: 3 }}
                  containerStyle={{
                    width: Dimensions.get('window').width - 40,
                  }}
                  inputContainerStyle={[
                    styles.textInput,
                    { backgroundColor: 'transparent', paddingLeft: 0 },
                  ]}
                  inputStyle={{
                    fontSize: 17,
                    color: colors.black,
                    fontFamily: 'Bariol-Regular',
                  }}
                  onBlur={tags.onBlur}
                  autoCorrect={false}
                  tagStyle={styles.tag}
                  tagTextStyle={styles.tagText}
                  ref={tagRef}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    if (Keyboard) Keyboard.dismiss();
                    onSubmit();
                  }}
                  keysForTag=","
                />
                {/* {tags.value &&
              tags.value.tagsArray &&
              !tags.value.tagsArray.length ? ( */}
                <Text
                  style={{
                    marginLeft: 10,
                    marginTop: 15,
                    fontSize: 14,
                    color: colors.black,
                    fontFamily: 'Bariol-Regular',
                  }}
                >
                  Tips: Enter a comma(,) to create a new tag
                </Text>
                {/* ) : null} */}
              </View>
            </Container>
          </ScrollView>
        )}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
About.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default About;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
const ImageWrapper = styled.View`
  background-color: ${colors.GREYS.C7};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: '#fff',
  },
  tagText: {
    color: colors.black,
  },
});
