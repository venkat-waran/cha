import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Clipboard,
} from 'react-native';
import { wp } from '../../utils/Dimensions';
import { colors, Custompadding } from '../../styles/styleSheet';
// import puppy from '../../assets/images/puppy.png';
import MissionDetails from '../sceneComponents/MissionPreview/MissionDetail';
import MilestoneCarousel from '../sceneComponents/MissionPreview/MilestoneCarousel';
import { GetIcon } from '../../utils/Icons';
import ButtonSection from '../sceneComponents/PublishedMission/ButtonSection';
import OverlayModal from '../sceneComponents/PublishedMission/OverlayModal';
import CustomModal from '../common/modal';
import Loader from '../common/Loader';
import { shareUrl } from '../../app/shared/utils/shareHelper';
import { useMissionDetailHook } from '../../app/shared/hooks';

const BASE_URL = `charitable.app/`;
const PublishedMission = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    route: { params: { missionId = null, isCreate = false } = {} },
  } = props;

  const {
    missionDetail: { data: missionDetail, loader: detailLoader, milestoneList },
  } = useMissionDetailHook(props, {
    missionId,
  });

  const MISSION_URL = `${BASE_URL}mission/${missionId}`;

  useEffect(() => {
    if (isCreate) setOpenModal(true);
  }, [isCreate]);

  const handleBack = () => {
    if (isCreate) {
      props.navigation.navigate('MissionControl');
    } else {
      props.navigation.goBack();
    }
  };

  const handleCopyUrl = () => {
    Clipboard.setString(MISSION_URL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
    props.successToast('Copied mission url to clipboard.');
  };

  const handleShareMission = () => {
    shareUrl({ url: MISSION_URL });
  };
  const handleContribute = () => {};

  return (
    <>
      {detailLoader ? (
        <Loader />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: colors.white }}
            style={{ flex: 1 }}
          >
            <ImageWrapper
              style={{
                height: wp(85.33),
                width: wp(100),
                position: 'relative',
              }}
            >
              <Image
                source={{
                  uri:
                    missionDetail.image && missionId
                      ? missionDetail.image
                      : missionDetail.image && missionDetail.image.uri,
                }}
                alt="puppy"
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
            </ImageWrapper>
            <TouchableOpacity
              onPress={handleBack}
              style={{
                position: 'absolute',
                top: Platform.OS === 'android' ? 20 : 50,
                left: 20,
              }}
            >
              {GetIcon('arrow-left|FontAwesome5', colors.white, wp(8))}
            </TouchableOpacity>
            <Container style={[Custompadding.paddingRegular]}>
              <MissionDetails
                missionDetail={missionDetail}
                missionId={missionId}
              />
              <MilestoneCarousel milestones={milestoneList} />
            </Container>
          </ScrollView>
          <ButtonSection
            navigation={props.navigation}
            onShareMission={handleShareMission}
            onContribute={handleContribute}
          />
        </>
      )}
      <CustomModal
        overlay
        noClose
        visible={openModal}
        closeCallback={() => setOpenModal(false)}
      >
        <OverlayModal
          url={MISSION_URL}
          missionDetail={missionDetail}
          onCopyURL={handleCopyUrl}
          onShareMission={handleShareMission}
          isCopied={isCopied}
        />
      </CustomModal>
    </>
  );
};
PublishedMission.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  successToast: PropTypes.func,
  // dispatch: PropTypes.func,
};
export default PublishedMission;
const ImageWrapper = styled.View`
  /* background-color: ${colors.GREYS.C7}; */
`;
const Container = styled.View`
  background-color: ${colors.white};
`;
