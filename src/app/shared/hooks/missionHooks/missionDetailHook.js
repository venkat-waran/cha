/* eslint-disable indent */
import { useMemo, useEffect } from 'react';
// import orderBy from 'lodash/orderBy';

export const useMissionDetailHook = (
  {
    Dash_hoc: {
      actions: { GET_MISSION_BY_ID_API_CALL },
    },
    Dash_data: { GET_MISSION_BY_ID_API, createMissionPayload },
    getData,
    dispatch,
  },
  { missionId = null } = {},
) => {
  const {
    milestones: orderedMilestones,
    about,
    social,
    cameraRoll: { files },
  } = createMissionPayload;
  // const [milestoneList, setMilestoneList] = useState([]);
  useEffect(() => {
    if (missionId) {
      getMissionDetail();
    }
  }, [missionId]);

  const getMissionDetail = () => {
    if (missionId) {
      GET_MISSION_BY_ID_API_CALL({
        request: {
          params: {
            missionId,
          },
        },
      });
    }
  };

  const missionDetail = useMemo(() => {
    const missionInfo = getData(GET_MISSION_BY_ID_API, {}, false);
    if (missionId && missionInfo.data && Object.keys(missionInfo.data).length) {
      if (
        missionInfo.data &&
        missionInfo.data.milestones &&
        missionInfo.data.milestones.length
      ) {
        // const milestones = orderBy(missionInfo.data.milestones, [
        //   'amount',
        //   'percentage_completed',
        // ]);
        // setMilestoneList(milestones);
        dispatch({
          type: 'UPDATE_MISSION_PAYLOAD',
          payload: {
            key: 'milestones',
            data: missionInfo.data.milestones,
          },
        });
      }
    }
    return missionInfo;
  }, [GET_MISSION_BY_ID_API]);

  return {
    missionDetail: {
      data: missionId
        ? missionDetail.data
        : {
            ...about,
            ...social,
            files: [...files],
            milestones: [...orderedMilestones],
          },
      loader: missionDetail.loader,
      // milestoneList: missionId ? milestoneList : orderedMilestones,
      milestoneList: orderedMilestones,
    },
    getMissionDetail,
  };
};
