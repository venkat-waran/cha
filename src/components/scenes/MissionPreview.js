/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { View, ScrollView, Image } from 'react-native';
import { wp } from '../../utils/Dimensions';
import { colors, Custompadding } from '../../styles/styleSheet';
import Header from '../common/header';
import Loader from '../common/Loader';
// import puppy from '../../assets/images/puppy.png';
import MissionDetails from '../sceneComponents/MissionPreview/MissionDetail';
import MilestoneCarousel from '../sceneComponents/MissionPreview/MilestoneCarousel';
import {
  usePublishMissionHook,
  useMissionDetailHook,
} from '../../app/shared/hooks';

const MissionPreview = (props) => {
  const {
    route: { params: { missionId = null } = {} },
  } = props;

  const {
    publishMission: { onPublish, loader: publishLoader },
  } = usePublishMissionHook(props, {
    onPublishSuccess,
    onPublishError,
  });

  const {
    missionDetail: {
      data: missionDetail,
      // loader: detailLoader,
      // getMissionDetail,
      milestoneList,
    },
  } = useMissionDetailHook(props, {
    missionId,
  });

  function onPublishSuccess({ data = {} }) {
    let mission = null;
    if (data && data.data && data.data.id) {
      mission = data.data.id;
    }
    const pushAction = StackActions.push('Mission', {
      missionId: mission,
      isCreate: true,
    });
    props.navigation.dispatch(pushAction);
    props.dispatch({
      type: 'CLEAR_MISSION_PAYLOAD',
    });
  }

  function onPublishError({ errors }) {
    alert(JSON.stringify(errors), 'error');
    props.errorToast(JSON.stringify(errors));
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={[
            Custompadding.paddingLeftRightLarge,
            Custompadding.paddingTopLarge,
          ]}
        >
          <Header
            heading="preview"
            rightHeading={publishLoader ? 'Publishing' : 'Publish'}
            backCallback={() => {
              if (!publishLoader) {
                props.navigation.goBack();
              }
            }}
            textCallback={!publishLoader ? onPublish : null}
          />
          <View
            style={[
              Custompadding.paddingTopRegular,
              Custompadding.paddingBottomLarge,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Progress.Bar
              progress={1}
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
        {publishLoader ? (
          <Loader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageWrapper
              style={{
                height: wp(85.33),
                width: wp(100),
                position: 'relative',
              }}
            >
              <Image
                source={{ uri: missionDetail.image && missionDetail.image.uri }}
                alt="puppy"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
            </ImageWrapper>
            <Container style={[Custompadding.paddingRegular]}>
              <MissionDetails missionDetail={missionDetail} />
              <MilestoneCarousel milestones={milestoneList} />
            </Container>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
MissionPreview.propTypes = {
  navigation: PropTypes.object,
  errorToast: PropTypes.func,
  dispatch: PropTypes.func,
  route: PropTypes.object,
};
export default MissionPreview;
const ImageWrapper = styled.View`
  background-color: ${colors.GREYS.C7};
`;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
