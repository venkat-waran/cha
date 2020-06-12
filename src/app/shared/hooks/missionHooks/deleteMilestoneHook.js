import { useMemo } from 'react';

export const useDeleteMilestoneHook = (
  {
    Dash_hoc: {
      actions: { DELETE_MISSION_MILESTONE_API_CALL },
    },
    Dash_data: { DELETE_MISSION_MILESTONE_API },
    getData,
  },
  { onDeleteMilestoneSuccess, onDeleteMilestoneError, milestoneId = null } = {},
) => {
  const handleDeleteMilestone = () => {
    DELETE_MISSION_MILESTONE_API_CALL({
      request: {
        params: {
          milestoneId,
        },
      },
      callback: {
        successCallback: ({ res, data, message, status }) => {
          onDeleteMilestoneSuccess({ res, data, message, status });
        },
        errorCallback: ({
          error,
          errorData: responseErrorParser,
          message,
          status,
          errors,
        }) => {
          onDeleteMilestoneError({
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

  const deleteMilestone = useMemo(
    () => getData(DELETE_MISSION_MILESTONE_API, [], false),
    [DELETE_MISSION_MILESTONE_API],
  );

  return {
    deleteMilestone: {
      loader: deleteMilestone.loader,
      onDelete: handleDeleteMilestone,
    },
  };
};
