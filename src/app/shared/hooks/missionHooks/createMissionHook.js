import { useState, useCallback, useMemo, useEffect } from 'react';
export const useCreateMissionHook = (
  {
    Dash_hoc: {
      actions: { UPDATE_MISSION_API_CALL },
    },
    Dash_data: { UPDATE_MISSION_API, GET_MISSION_BY_ID_API },
    getData,
    dispatch,
  },
  {
    onMissionSuccess,
    onMissionError,
    missionId,
    locationInfo = {},
    selectedCategory = {},
  } = {},
) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [imageFormData, setImageFormData] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });
  const [maxLength, setMaxLength] = useState(140);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  // const [selectedCat, setSelectedCategory] = useState('');

  const [titleError, setTitleError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [imageError, setImageError] = useState('');
  const [shortDescriptionError, setShortDescriptionError] = useState('');
  const [longDescriptionError, setLongDescriptionError] = useState('');
  const [tagsError, setTagsError] = useState('');
  // const [searchTextError, setSearchTextError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    if (Object.keys(locationInfo)) {
      if (locationInfo.postCode && !pinCode.length) {
        setPinCode(locationInfo.postCode);
      }
      if (locationInfo.latitude) {
        setLatitude(locationInfo.latitude);
      }
      if (locationInfo.longitude) {
        setLongitude(locationInfo.longitude);
      }
      if (locationInfo.city) {
        setCity(locationInfo.city);
      }
      if (locationInfo.state) {
        setState(locationInfo.state);
      }
      if (locationInfo.searchText) {
        setSearchText(locationInfo.searchText);
      }
    }
  }, [locationInfo]);

  useEffect(() => {
    if (selectedCategory && Object.keys(selectedCategory)) {
      if (selectedCategory.id !== category.id) setCategory(selectedCategory);
      // setSelectedCategory(selectedCategory.id);
    }
  }, [selectedCategory]);

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

  const onChangeShortDescription = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (shortDescriptionError) {
      setShortDescriptionError('');
    }
    if (value && value.length) setMaxLength(140 - value.length);
    setShortDescription(value);
  };

  const onBlurShortDescription = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(shortDescription, 'shortDescription');
      if (error) setShortDescriptionError(error);
    },
    [shortDescription],
  );

  const onChangeLongDescription = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (longDescriptionError) {
      setLongDescriptionError('');
    }
    setLongDescription(value);
  };

  const onBlurLongDescription = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(longDescription, 'longDescription');
      if (error) setLongDescriptionError(error);
    },
    [longDescription],
  );

  const onChangePinCode = (e) => {
    const value = getPlatformBasedFieldValue(e);
    if (pinCodeError) {
      setPinCodeError('');
    }
    if ((Number(value) === 0 || Number(value)) && value.length <= 6)
      setPinCode(value);
  };

  const onBlurPinCode = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(pinCode, 'pinCode');
      if (error) setPinCodeError(error);
    },
    [pinCode],
  );

  const onChangeImage = (imageInfo, imageUri) => {
    if (imageUri) {
      setImageError('');
    }
    setImageFormData(imageInfo);
    setImage(imageUri);
  };

  const onChangeTags = (value) => {
    // const value = getPlatformBasedFieldValue(e);
    if (tagsError) {
      setTagsError('');
    }
    setTags(value);
  };

  const onBlurTags = useCallback(
    (e) => {
      e.preventDefault();
      const error = validate(tags, 'tags');
      if (error) setTagsError(error);
    },
    [tags],
  );

  const handelCreateUpdateAboutSetup = () => {
    const formError = [];
    const isTitleError = validate(title, 'title');
    const isShortDescError = validate(shortDescription, 'shortDescription');
    const isPinCodeError = validate(pinCode, 'pinCode');
    // const isSearchTextError = validate(searchText, 'searchText');
    const isCategoryError = validate(category, 'category');
    let isImageError = '';
    if (!missionId) isImageError = validate(imageFormData, 'image');
    if (isTitleError) {
      formError.push(null);
      setTitleError(isTitleError);
    }
    if (isShortDescError) {
      formError.push(null);
      setShortDescriptionError(isShortDescError);
    }
    if (isPinCodeError) {
      formError.push(null);
      setPinCodeError(isPinCodeError);
    }
    if (isImageError) {
      formError.push(null);
      setImageError(isImageError);
    }
    // if (isSearchTextError) {
    //   formError.push(null);
    //   setSearchTextError(isSearchTextError);
    // }
    if (isCategoryError && !missionId) {
      formError.push(null);
      setCategoryError(isCategoryError);
    }

    if (!formError.length) {
      let formattedTags = '';
      if (tags.tagsArray && tags.tagsArray.length) {
        formattedTags = tags.tagsArray.join();
      }
      const payload = {
        image: imageFormData,
        title,
        zip_code: pinCode,
        description: shortDescription,
        long_description: longDescription,
        tags: formattedTags,
        city: searchText,
        state,
        location_coordinates: `${latitude},${longitude}`,
        categories: [category.id],
      };

      if (missionId) {
        delete payload.categories;
      }

      const formData = new FormData();
      Object.entries(payload).map(([key, value]) => {
        if (key === 'image') {
          if (Object.keys(imageFormData).length) {
            formData.append(key, value);
          }
        } else if (key === 'categories' && !missionId) {
          formData.append('categories', JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
        return null;
      });
      if (!missionId) {
        dispatch({
          type: 'UPDATE_MISSION_PAYLOAD',
          payload: {
            key: 'about',
            data: payload,
          },
        });
        onMissionSuccess({ data: {} });
      } else {
        const params = {
          missionId,
        };
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
              onMissionSuccess({ res, data, message, status });
            },
            errorCallback: ({
              error,
              errorData: responseErrorParser,
              message,
              status,
              errors,
            }) => {
              onMissionError({
                error,
                responseErrorParser,
                message,
                status,
                errors,
              });
            },
          },
        });
      }
    }
  };

  const updateAboutSetup = useMemo(
    () => getData(UPDATE_MISSION_API, [], false),
    [UPDATE_MISSION_API],
  );

  const missionDetail = useMemo(() => {
    const missionInfo = getData(GET_MISSION_BY_ID_API, {}, false);
    if (missionInfo.data && Object.keys(missionInfo.data).length) {
      const missionData = missionInfo.data;
      setTitle(missionData.title);
      setImage({ uri: missionData.image });
      setImageFormData('');
      setPinCode(missionData.zip_code);
      setShortDescription(missionData.description);
      setLongDescription(missionData.long_description);
      // setCategory({ id: missionData.category, name: missionData.category });
      setCategory(missionData.categories);
      // selectedCategory(missionData.category);
      if (missionData.description && missionData.description.length)
        setMaxLength(140 - missionData.description.length);
      if (missionData.tags && missionData.tags.length) {
        const tagsDetail = missionData.tags;
        const tagsArray = tagsDetail.split(',');
        setTags({
          tag: '',
          tagsArray,
        });
      }
      if (
        missionData.location_coordinates &&
        missionData.location_coordinates.length
      ) {
        const coordinates = missionData.location_coordinates;
        const coordinatesArray = coordinates.split(',');
        if (coordinatesArray.length) {
          setLatitude(coordinatesArray[0]);
          setLongitude(coordinatesArray[1]);
        }
      }
      setSearchText(missionData.city);
      // setCity(missionData.city);
      setState(missionData.state);
    }
    return missionInfo;
  }, [GET_MISSION_BY_ID_API]);

  return {
    title: {
      value: title,
      onChange: onChangeTitle,
      error: titleError,
      onBlur: onBlurTitle,
    },
    image: {
      value: image,
      formData: imageFormData,
      onChange: onChangeImage,
      error: imageError,
    },
    pinCode: {
      value: pinCode,
      onChange: onChangePinCode,
      error: pinCodeError,
      onBlur: onBlurPinCode,
    },
    tags: {
      value: tags,
      onChange: onChangeTags,
      error: tagsError,
      onBlur: onBlurTags,
    },
    shortDescription: {
      value: shortDescription,
      onChange: onChangeShortDescription,
      onBlur: onBlurShortDescription,
      error: shortDescriptionError,
      maxLength,
    },
    longDescription: {
      value: longDescription,
      onChange: onChangeLongDescription,
      error: longDescriptionError,
      onBlur: onBlurLongDescription,
    },
    createMission: {
      onSubmit: handelCreateUpdateAboutSetup,
      loader: updateAboutSetup.loader,
      missionDetail,
    },
    searchText: {
      value: searchText,
      // error: searchTextError,
      error: false,
    },
    category: {
      value: category,
      error: categoryError,
    },
    latitude,
    longitude,
    city,
    state,
  };
};

// Helpers
function getPlatformBasedFieldValue(e) {
  return typeof e === 'object' ? e.target.value : e;
}

function validate(value, fieldTitle) {
  switch (fieldTitle) {
    case 'title': {
      if (!value) return 'Please enter your the title';
      return '';
    }
    case 'image': {
      if (!value) return 'Please upload the mission image';
      return '';
    }
    case 'pinCode': {
      if (!value) return 'Please enter the zipcode';
      if (value && value.length !== 5) return 'zipcode must be 5 Digit';
      return '';
    }
    case 'shortDescription': {
      if (!value) return 'Please enter the brief description';
      if (value && value.length > 140)
        return 'brief description should be less than 140 characters';
      return '';
    }
    case 'searchText': {
      if (!value) return 'Please enter mission location';
      return '';
    }
    case 'category': {
      if (!value) return 'Please enter mission location';
      return '';
    }
    default:
      //   if (!value) return 'This field is required';
      return '';
  }
}
