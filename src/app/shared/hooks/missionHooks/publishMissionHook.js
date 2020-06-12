import { useMemo } from 'react';

export const usePublishMissionHook = (
  {
    Dash_hoc: {
      actions: { CREATE_MISSION_API_CALL },
    },
    Dash_data: { CREATE_MISSION_API, createMissionPayload },
    getData,
  },
  { onPublishSuccess, onPublishError } = {},
) => {
  const handelPublishMission = () => {
    const formData = new FormData();
    Object.entries(createMissionPayload.about).map(([key, value]) => {
      if (key === 'categories') {
        formData.append('categories', JSON.stringify(value));
      } else if (value) formData.append(key, value);
      return null;
    });
    Object.entries(createMissionPayload.social).map(([key, value]) => {
      if (value) formData.append(key, value);
      return null;
    });
    if (
      createMissionPayload.milestones &&
      createMissionPayload.milestones.length
    ) {
      formData.append(
        'milestones',
        JSON.stringify(createMissionPayload.milestones),
      );
    }
    if (
      createMissionPayload.cameraRoll.files &&
      createMissionPayload.cameraRoll.files.length
    ) {
      // formData.append(
      //   'files',
      //   JSON.stringify(createMissionPayload.cameraRoll.files),
      // );
      createMissionPayload.cameraRoll.files.map((file) => {
        formData.append('files', file);
        return null;
      });
    }
    CREATE_MISSION_API_CALL({
      request: {
        payload: formData,
        axiosConfig: {
          headers: {
            'content-type': 'multipart/form-data',
            accept: 'application/json',
          },
        },
      },
      callback: {
        successCallback: ({ res, data, message, status }) => {
          onPublishSuccess({ res, data, message, status });
        },
        errorCallback: ({
          error,
          errorData: responseErrorParser,
          message,
          status,
          errors,
        }) => {
          onPublishError({
            error,
            responseErrorParser,
            message,
            status,
            errors,
          });
        },
      },
    });
  };

  const publishMission = useMemo(() => getData(CREATE_MISSION_API, [], false), [
    CREATE_MISSION_API,
  ]);

  return {
    publishMission: {
      onPublish: handelPublishMission,
      loader: publishMission.loader,
    },
  };
};
