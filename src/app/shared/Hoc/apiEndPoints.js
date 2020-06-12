import BASE_URL from '../utils/BaseUrl';
export const API_BASE_URL = BASE_URL;

// const TEST_API = {
//   url: 'https://jsonplaceholder.typicode.com/posts/',
//   method: 'GET',
//   responseStatusCode: [900],
//   responseStatusKey: 'code',
//   responseDataKey: 'data',
//   responseMessageKey: 'message',
// };

/* ******  Authentication APIs Start ****** */
const GET_PROFILE_API = {
  url: ({ userId }) => `${API_BASE_URL}user/update/profile/${userId}`,
  method: 'GET',
};
const CREATE_PROFILE_API = {
  url: `${API_BASE_URL}user/create/profile/`,
  method: 'POST',
};
const UPDATE_PROFILE_API = {
  url: ({ userId }) => `${API_BASE_URL}user/update/profile/${userId}`,
  method: 'PUT',
};
const LOGIN_API = {
  url: `${API_BASE_URL}user/login/`,
  method: 'POST',
};
const LOGIN_EMAIL_API = {
  url: `${API_BASE_URL}login/`,
  method: 'POST',
};
/* ******  Authentication APIs End ****** */

/* ******  Missions APIs Start ****** */

// Missions
const CREATE_MISSION_API = {
  url: `${API_BASE_URL}mission/mission/`,
  method: 'POST',
};
const GET_ALL_MISSIONS_API = {
  url: `${API_BASE_URL}mission/mission/`,
  method: 'GET',
};
const GET_USER_MISSIONS_API = {
  url: `${API_BASE_URL}mission/user_missions/`,
  method: 'GET',
};
const UPDATE_MISSION_API = {
  url: ({ missionId }) => `${API_BASE_URL}mission/mission/${missionId}`,
  method: 'PATCH',
};
const GET_MISSION_BY_ID_API = {
  url: ({ missionId }) => `${API_BASE_URL}mission/mission/${missionId}`,
  method: 'GET',
};
const GET_MISSION_CATEGORIES_API = {
  url: `${API_BASE_URL}mission/mission_category/`,
  method: 'GET',
};

// Milestones
const GET_MISSION_MILESTONES_API = {
  url: ({ missionId }) =>
    `${API_BASE_URL}mission/mission_milestone/${missionId}`,
  method: 'GET',
};
const ADD_MISSION_MILESTONE_API = {
  url: `${API_BASE_URL}mission/mission_milestone/`,
  method: 'POST',
};
const UPDATE_MISSION_MILESTONE_API = {
  url: ({ milestoneId }) =>
    `${API_BASE_URL}mission/mission_milestone/${milestoneId}`,
  method: 'PATCH',
};
const DELETE_MISSION_MILESTONE_API = {
  url: ({ milestoneId }) =>
    `${API_BASE_URL}mission/mission_milestone/${milestoneId}`,
  method: 'DELETE',
};
// Content
const ADD_MISSION_FILES_API = {
  url: () => `${API_BASE_URL}mission/mission_files/`,
  method: 'POST',
};
const DELETE_MISSION_FILES_API = {
  url: ({ contentId }) => `${API_BASE_URL}mission/mission_files/${contentId}`,
  method: 'DELETE',
};

/* ******  Missions APIs End ****** */
export const dashboard = {
  /* ****** Authentication APIs Start ****** */
  GET_PROFILE_API,
  CREATE_PROFILE_API,
  UPDATE_PROFILE_API,
  LOGIN_API,
  LOGIN_EMAIL_API,
  /* ******  Authentication APIs End ****** */
  /* ******  Missions APIs Start ****** */
  CREATE_MISSION_API,
  UPDATE_MISSION_API,
  GET_ALL_MISSIONS_API,
  GET_USER_MISSIONS_API,
  GET_MISSION_BY_ID_API,
  GET_MISSION_MILESTONES_API,
  ADD_MISSION_MILESTONE_API,
  GET_MISSION_CATEGORIES_API,
  UPDATE_MISSION_MILESTONE_API,
  DELETE_MISSION_MILESTONE_API,
  ADD_MISSION_FILES_API,
  DELETE_MISSION_FILES_API,
  /* ******  Missions APIs End ****** */
};

export const authentication = {
  // TEST_API,
};
