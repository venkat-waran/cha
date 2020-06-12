/* eslint-disable no-unused-vars */
import {
  HOC as HocConfigure,
  commonConstants,
  store,
  newObject,
} from 'react-boilerplate-redux-saga-hoc';
import orderBy from 'lodash/orderBy';
import { dashboard as DASHBOARD_API_END_POINTS } from './apiEndPoints';
import axios from './axios';
const { CALL, ON_SUCCESS, ON_ERROR, ON_UNMOUNT } = commonConstants;

const HOC = HocConfigure({
  handlers: [],
  isReactBoilerplate: false,
});

const reducer = ({
  constants,
  successData,
  restSuccessData,
  payload,
  query,
  state,
  params,
  restPayload,
  loadingStatus,
  statusCode,
  type,
  reset,
  newState,
  method,
  statusMessage,
  errorData,
  restErrorData,
  resetState,
  initialState,
  commonHandler,
  commmonErrorHandler,
  defaultReducerHandler,
}) => {
  switch (type) {
    case constants.GET_PROFILE_API[CALL]:
    case constants.CREATE_PROFILE_API[CALL]:
    case constants.LOGIN_API[CALL]:
    case constants.LOGIN_EMAIL_API[CALL]:
      switch (method) {
        case ON_SUCCESS: {
          return newState(({ profile, [type]: Data }) => ({
            isInitialize: true,
            isLoggedIn: !!successData.token || !!successData.id,
            userProfile: newObject(profile, successData),
            [type]: newObject(Data, commonHandler()),
          }));
        }
        default:
          return defaultReducerHandler();
      }

    default:
      return defaultReducerHandler();
  }
};

const DashboardHoc = HOC({
  initialState: {
    firebaseProfile: {
      providerData: [],
      displayName: '',
      phoneNumber: '',
      email: '',
    },
    userProfile: {},
    createMissionPayload: {
      about: {},
      social: {},
      milestones: [],
      cameraRoll: {
        files: [],
      },
    },
    isLoggedIn: false,
    isInitialize: true,
    authListener: true,
  },
  dontReset: {
    TEST_API: {},
  },
  reducer,
  constantReducer: ({
    type,
    state,
    action,
    constants,
    initialState,
    resetState,
  }) => {
    switch (type) {
      case 'UPDATE_FIREBASE_PROFILE':
        return {
          ...state,
          // isLoggedIn: action.payload.isLoggedIn,
          isInitialize: action.payload.isInitialize,
          firebaseProfile: action.payload.profile || initialState.profile,
        };
      case 'UPDATE_AUTH':
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
        };
      case 'UPDATE_AUTH_LISTENER':
        return {
          ...state,
          authListener: action.payload.authListener,
        };
      case 'UPDATE_MISSION_PAYLOAD': {
        let payloadData = action.payload.data;
        if (action.payload.key === 'milestones') {
          let mileStoneCopy = [];
          if (Array.isArray(payloadData)) {
            mileStoneCopy = [...payloadData];
          } else {
            mileStoneCopy = [
              ...state.createMissionPayload.milestones,
              payloadData,
            ];
          }
          payloadData = orderBy(mileStoneCopy, [
            'amount',
            'percentage_completed',
          ]);
        }
        return {
          ...state,
          createMissionPayload: {
            ...state.createMissionPayload,
            [action.payload.key]: payloadData,
          },
        };
      }
      case 'DELETE_MILESTONE': {
        const mileStoneCopy = [...state.createMissionPayload.milestones];
        mileStoneCopy.splice(mileStoneCopy.length - 1, 1);
        return {
          ...state,
          createMissionPayload: {
            ...state.createMissionPayload,
            milestones: mileStoneCopy,
          },
        };
      }
      case 'CLEAR_MISSION_PAYLOAD':
        return {
          ...state,
          createMissionPayload: {
            about: {},
            social: {},
            milestones: [],
            cameraRoll: {
              files: [],
            },
          },
        };
      case 'LOGOUT':
        return { ...resetState, ...initialState };
      default:
        return state;
    }
  },
  apiEndPoints: DASHBOARD_API_END_POINTS,
  name: 'Dash',
  axiosInterceptors: axios,
});

export { DashboardHoc };
