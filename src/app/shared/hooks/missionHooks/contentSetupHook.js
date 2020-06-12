import { useState, useMemo, useEffect } from 'react';
import { Platform } from 'react-native';
export const useContentSetupHook = (
  {
    Dash_hoc: {
      actions: { DELETE_MISSION_FILES_API_CALL, UPDATE_MISSION_API_CALL },
    },
    Dash_data: {
      DELETE_MISSION_FILES_API,
      UPDATE_MISSION_API,
      GET_MISSION_BY_ID_API,
      createMissionPayload: { cameraRoll },
    },
    getData,
    dispatch,
  },
  {
    onAddRemoveError,
    onAddRemoveSuccess,
    onContentSuccess,
    onContentError,
    missionId = null,
    maxCount,
  } = {},
) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [cameraRollImages, setCameraRollImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    if (!missionId && cameraRoll.files && cameraRoll.files.length) {
      setCameraRollImages(cameraRoll.files);
    }
  }, [missionId, cameraRoll]);

  const handleCameraRoll = (imageData) => {
    let selectedImages = [];
    if (imageData && imageData.length) {
      selectedImages = imageData.map((image) => ({
        uri: image.path,
        name: Platform.OS === 'ios' ? image.filename : 'Mission',
        type: image.mime,
        // ext: image.type ? image.type : image.path.split('.')[1],
      }));
    }
    if (cameraRollImages.length + imageData.length > maxCount) {
      onAddRemoveError(
        `Maximum of no of images allowed only ${maxCount}, Removing extra images`,
      );
      const noOfImagesRequired = maxCount - cameraRollImages.length;
      const noOfImagesToRemove = imageData.length - noOfImagesRequired;
      selectedImages.splice(noOfImagesRequired, +noOfImagesToRemove);
    }
    const imageCopy = [...cameraRollImages];
    const imageResult = imageCopy.concat(selectedImages);
    setCameraRollImages(imageResult);
  };

  const handleRemoveModal = (imageIndex, selected = null) => {
    setConfirmationModal(!confirmationModal);
    setImageToRemove(imageIndex);
    setSelectedImage(selected);
  };

  const removeLocalImages = () => {
    const imageCopy = [...cameraRollImages];

    imageCopy.splice(imageToRemove, 1);
    setCameraRollImages(imageCopy);
    handleRemoveModal('');
  };

  const handleRemoveImage = () => {
    if (selectedImage && selectedImage.id) {
      DELETE_MISSION_FILES_API_CALL({
        request: {
          params: {
            contentId: selectedImage.id,
          },
        },
        callback: {
          successCallback: ({ res, data, message, status }) => {
            removeLocalImages();
            onAddRemoveSuccess({ res, data, message, status });
          },
          errorCallback: ({
            error,
            errorData: responseErrorParser,
            message,
            status,
            errors,
          }) => {
            handleRemoveModal('');
            onAddRemoveError({
              error,
              responseErrorParser,
              message,
              status,
              errors,
            });
          },
        },
      });
    } else {
      removeLocalImages();
    }
  };

  const handelCreateContent = () => {
    const payload = {
      files: cameraRollImages,
    };

    if (!missionId) {
      dispatch({
        type: 'UPDATE_MISSION_PAYLOAD',
        payload: {
          key: 'cameraRoll',
          data: payload,
        },
      });
      onContentSuccess({ data: {} });
    } else {
      const filesToAdd = cameraRollImages.filter((image) => !image.id);
      const params = { missionId };
      if (filesToAdd && filesToAdd.length) {
        const formData = new FormData();
        filesToAdd.map((file) => {
          formData.append('files', file);
          return null;
        });
        UPDATE_MISSION_API_CALL({
          request: {
            payload: formData,
            params,
            axiosConfig: {
              headers: {
                'content-type': 'multipart/form-data',
                accept: 'application/json',
              },
            },
          },
          callback: {
            successCallback: ({ res, data, message, status }) => {
              onContentSuccess({ res, data, message, status });
            },
            errorCallback: ({ error, errorData, message, status, errors }) => {
              onContentError({
                error,
                errorData,
                message,
                status,
                errors,
              });
            },
          },
        });
      } else {
        onContentSuccess({});
      }
    }
  };

  const missionDetail = useMemo(() => {
    const missionInfo = getData(GET_MISSION_BY_ID_API, {}, false);
    if (missionId && missionInfo.data && Object.keys(missionInfo.data).length) {
      if (
        missionInfo.data &&
        missionInfo.data.files &&
        missionInfo.data.files.length
      ) {
        setCameraRollImages(missionInfo.data.files);
      }
    }
    return missionInfo;
  }, [GET_MISSION_BY_ID_API]);

  const updateContent = useMemo(() => getData(UPDATE_MISSION_API, {}, false), [
    UPDATE_MISSION_API,
  ]);
  const deleteContent = useMemo(
    () => getData(DELETE_MISSION_FILES_API, {}, false),
    [DELETE_MISSION_FILES_API],
  );

  return {
    cameraRollImages,
    showModal: confirmationModal,
    onSelectImages: handleCameraRoll,
    onRemoveConfirm: handleRemoveImage,
    onModalShowClose: handleRemoveModal,
    updateContent: {
      onSubmit: handelCreateContent,
      loader: updateContent.loader,
    },
    deleteContent: {
      loader: deleteContent.loader,
    },
    missionDetail,
  };
};
