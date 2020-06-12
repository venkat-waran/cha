import { useState, useCallback, useMemo } from 'react';

export const useCreateMissionMilestoneHook = (
  {
    Dash_hoc: {
      actions: { UPDATE_MISSION_API_CALL },
    },
    Dash_data: { UPDATE_MISSION_API, createMissionPayload },
    getData,
    dispatch,
  },
  {
    onMilestoneSuccess,
    onMilestoneError,
    missionId = null,
    onAddSuccess,
    onRemoveSuccess,
  } = {},
) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const [titleError, setTitleError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const onChangeTitle = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (titleError) {
      setTitleError('');
    }
    setTitle(value);
  };

  const onBlurTitle = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(title, 'title');
      if (error) setTitleError(error);
    },
    [title],
  );

  const onChangeDescription = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (descriptionError) {
      setDescriptionError('');
    }
    setDescription(value);
  };

  const onBlurDescription = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(description, 'description');
      if (error) setDescriptionError(error);
    },
    [description],
  );

  const onChangeAmount = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (amountError) {
      setAmountError('');
    }
    if (Number(value) === 0 || Number(value)) setAmount(+value);
  };

  const onBlurAmount = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(amount, 'amount');
      if (error) setAmountError(error);
    },
    [amount],
  );

  const handleSaveMilestone = () => {
    const formData = new FormData();
    const { milestones } = createMissionPayload;
    const milestonesToSave = milestones.filter((milestone) => !milestone.id);
    formData.append('milestones', JSON.stringify(milestonesToSave));
    const params = { missionId };
    UPDATE_MISSION_API_CALL({
      request: {
        params,
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
          onMilestoneSuccess({ res, data, message, status });
        },
        errorCallback: ({
          error,
          errorData: responseErrorParser,
          message,
          status,
          errors,
        }) => {
          onMilestoneError({
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

  const handelCreateMilestone = () => {
    const formError = [];
    const isTitleError = validate(title, 'title');
    const isDescError = validate(description, 'description');
    const isAmountError = validate(amount, 'amount');
    if (isTitleError) {
      formError.push(null);
      setTitleError(isTitleError);
    }
    if (isDescError) {
      formError.push(null);
      setDescriptionError(isDescError);
    }
    if (isAmountError) {
      formError.push(null);
      setAmountError(isAmountError);
    }

    if (!formError.length) {
      const payload = {
        title,
        amount,
        description,
      };
      dispatch({
        type: 'UPDATE_MISSION_PAYLOAD',
        payload: {
          key: 'milestones',
          data: payload,
        },
      });
      onAddSuccess({ data: {} });
    }
  };

  const handleDeleteMileStone = () => {
    dispatch({
      type: 'DELETE_MILESTONE',
    });
    onRemoveSuccess();
  };

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setAmount(0);
    setTitleError('');
    setDescriptionError('');
    setAmountError('');
  };

  const createMilestone = useMemo(
    () => getData(UPDATE_MISSION_API, [], false),
    [UPDATE_MISSION_API],
  );

  // const mileStoneDetail = useMemo(() => {
  //   const milestoneInfo = getData(GET_MILESTONE_BY_ID_API, {}, false);
  //   if (milestoneInfo.data && Object.keys(milestoneInfo.data).length) {
  //     const milestoneData = milestoneInfo.data;
  //     setTitle(milestoneData);
  //     setAmount(+milestoneData);
  //     setDescription(milestoneData);
  //   }
  //   return milestoneInfo;
  // }, [GET_MILESTONE_BY_ID_API]);

  return {
    title: {
      value: title,
      onChange: onChangeTitle,
      error: titleError,
      onBlur: onBlurTitle,
    },
    amount: {
      value: amount,
      onChange: onChangeAmount,
      error: amountError,
      onBlur: onBlurAmount,
    },
    description: {
      value: description,
      onChange: onChangeDescription,
      onBlur: onBlurDescription,
      error: descriptionError,
    },
    createMilestone: {
      onCreate: handelCreateMilestone,
      loader: createMilestone.loader,
      onDelete: handleDeleteMileStone,
      onNextOrSave: handleSaveMilestone,
      // mileStoneDetail,
    },
    clearForm: handleClearForm,
  };
};

// Helpers
function getPlatformBasedFieldValue(e) {
  return typeof e === 'object' ? e.target.value : e;
}

function validate(value, fieldTitle) {
  switch (fieldTitle) {
    case 'title': {
      if (!value) return 'Please enter your the milestone title';
      return '';
    }
    case 'amount': {
      if (!value) return 'Please enter the milestone amount';
      return '';
    }
    case 'description': {
      if (!value) return 'Please enter the milestone description';
      // if (value && value.length > 140)
      //   return 'brief description should be less than 140 characters';
      return '';
    }
    default:
      //   if (!value) return 'This field is required';
      return '';
  }
}
