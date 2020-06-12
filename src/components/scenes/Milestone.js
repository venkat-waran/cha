import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import Header from '../common/header';
import { colors, Custompadding, typography } from '../../styles/styleSheet';
import { wp } from '../../utils/Dimensions';
import MilestoneList from '../sceneComponents/Milestone/MilestoneList';
import BottomSection from '../sceneComponents/Milestone/BottomSection';
import CreateMilestone from '../sceneComponents/Milestone/CreateMilestone';
import ConfirmationModal from '../common/ConfirmationModal';
import CustomModal from '../common/modal';
import Loader from '../common/Loader';
import {
  useCreateMissionMilestoneHook,
  useMissionDetailHook,
} from '../../app/shared/hooks';

const Milestone = (props) => {
  const [showCreateMilestone, setShowCreateMilestone] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    route: { params: { missionId = null } = {} },
  } = props;

  const {
    title,
    amount,
    description,
    createMilestone,
    clearForm,
  } = useCreateMissionMilestoneHook(props, {
    onMilestoneSuccess,
    onMilestoneError,
    onAddSuccess,
    onRemoveSuccess,
    missionId,
  });

  const {
    missionDetail: {
      // data: missionDetail,
      loader: detailLoader,
      // getMissionDetail,
      milestoneList,
    },
  } = useMissionDetailHook(props, {
    missionId,
  });

  function onMilestoneSuccess() {
    handleMilestoneModal('close');
    if (missionId) {
      props.navigation.navigate('MissionControl');
    } else {
      props.navigation.navigate('Preview');
    }
  }

  function onMilestoneError() {}

  function onAddSuccess() {
    handleMilestoneModal('close');
    props.successToast('Milestone Added Successfully');
  }

  function onRemoveSuccess() {
    handleMilestoneModal('close');
    props.successToast('Milestone Removed Successfully');
  }

  const handleMilestoneModal = (clickType) => {
    clearForm();
    switch (clickType) {
      case 'showMilestone':
        setShowCreateMilestone(true);
        break;
      case 'showDelete':
        setShowConfirm(true);
        break;
      case 'close':
        setShowCreateMilestone(false);
        setShowConfirm(false);
        break;

      default:
    }
  };

  const handleNextClick = () => {
    if (milestoneList && milestoneList.length) {
      if (missionId) {
        createMilestone.onNextOrSave();
      } else {
        props.navigation.navigate('Preview');
      }
    } else {
      props.errorToast('Add minimum 1 milestone to continue');
    }
  };

  let textLabel = 'Next';
  if (missionId) {
    textLabel = 'Save';
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container>
        <View
          style={[
            Custompadding.paddingLeftRightLarge,
            Custompadding.paddingTopLarge,
          ]}
        >
          <Header
            heading="milestones"
            rightHeading={createMilestone.loader ? 'Updating' : textLabel}
            backCallback={() => {
              props.navigation.goBack();
            }}
            textCallback={handleNextClick}
          />
          <View
            style={[
              Custompadding.paddingTopBottomRegular,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Progress.Bar
              progress={0.8}
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
        <Text
          style={[
            Custompadding.paddingTopBottomRegular,
            typography.regular.h6,
            { textAlign: 'center' },
          ]}
        >
          Add detailed milestones to attract and keep your contributors engaged.
        </Text>
        {detailLoader || createMilestone.loader ? (
          <Loader />
        ) : (
          <>
            {/* {missionDetail && Object.keys(missionDetail).length ? (
              <> */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <MilestoneList milestoneList={milestoneList} />
            </ScrollView>
            <BottomSection
              onCreateMilestone={() => handleMilestoneModal('showMilestone')}
              onDeleteMilestone={() => handleMilestoneModal('showDelete')}
              showRemove={milestoneList && milestoneList.length}
            />
            {/* </>
            ) : null} */}
          </>
        )}
      </Container>
      <CustomModal
        noClose
        visible={showCreateMilestone}
        closeCallback={() => handleMilestoneModal('close')}
      >
        <CreateMilestone
          closeCallback={() => handleMilestoneModal('close')}
          title={title}
          amount={amount}
          description={description}
          createMilestone={createMilestone}
        />
      </CustomModal>

      <CustomModal
        noClose
        visible={showConfirm}
        closeCallback={() => handleMilestoneModal('close')}
      >
        <ConfirmationModal
          customText="Are you sure you want to delete the last milestone?"
          confirmText="delete"
          onConfirm={createMilestone.onDelete}
          onClose={() => handleMilestoneModal('close')}
        />
      </CustomModal>
    </SafeAreaView>
  );
};
Milestone.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  errorToast: PropTypes.func,
  successToast: PropTypes.func,
};
export default Milestone;
const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;
