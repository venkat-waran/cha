/* eslint-disable indent */
import { useMemo, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useUserMissionsHook = ({
  Dash_hoc: {
    actions: { GET_USER_MISSIONS_API_CALL },
  },
  Dash_data: { GET_USER_MISSIONS_API },
  getData,
}) => {
  const [activeMissions, setActiveMissions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      GET_USER_MISSIONS_API_CALL();
    }, []),
  );

  const userMissionList = useMemo(() => {
    const userMissions = getData(GET_USER_MISSIONS_API, [], false);
    if (userMissions && userMissions.data && userMissions.data.length) {
      if (userMissions.data && userMissions.data.length) {
        const missionCopy = userMissions.data;
        const active = missionCopy.filter((mission) => mission.is_active);
        setActiveMissions(active);
      }
    } else {
      setActiveMissions([]);
    }
    return userMissions;
  }, [GET_USER_MISSIONS_API]);

  return {
    userMissionList: {
      data: userMissionList.data,
      loader: userMissionList.loader,
    },
    activeMissions,
  };
};
