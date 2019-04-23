import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    //when there isn't a profile just return an empty object
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

export const createProfile = (profile, history) => async dispatch => {
  const token = localStorage.getItem("jwtToken");
  setAuthToken(token);
  try {
    await axios.post("/api/profile", profile);
    history.push("/dashboard");
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
