import { useMemo, useEffect } from 'react';

export const useMilestonesListHook = (
  {
    Dash_hoc: {
      actions: { GET_MISSION_MILESTONES_API_CALL },
    },
    Dash_data: { GET_MISSION_MILESTONES_API },
    getData,
  },
  { missionId = null } = {},
) => {
  useEffect(() => {
    if (missionId) {
      GET_MISSION_MILESTONES_API_CALL({
        request: {
          params: {
            missionId,
          },
        },
      });
    }
  }, [missionId]);

  const milestoneList = useMemo(
    () => getData(GET_MISSION_MILESTONES_API, [], false),
    [GET_MISSION_MILESTONES_API],
  );

  return {
    milestoneList: {
      data: milestoneList.data,
      loader: milestoneList.loader,
    },
  };
};
