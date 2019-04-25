import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    //when there isn't a profile just return an empty object
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    //when there isn't a profile just return an empty object
    dispatch({ type: GET_PROFILE, payload: null });
  }
};

export const createProfile = (profile, history) => async dispatch => {
  try {
    await axios.post("/api/profile", profile);
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("/api/profile/all");
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_PROFILES, payload: null });
  }
};

export const addExperience = (exp, history) => async dispatch => {
  try {
    await axios.post("/api/profile/experience", exp);
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const addEducation = (edu, history) => async dispatch => {
  try {
    await axios.post("/api/profile/education", edu);
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
export const deleteEducation = id => async dispatch => {
  console.log("DELETE ID ", id);
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    if (window.confirm("Are you sure ? This can NOT be undone!")) {
      await axios.delete("/api/profile");
      dispatch({ type: SET_CURRENT_USER, payload: {} });
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
