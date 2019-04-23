import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    // const token = localStorage.getItem("jwtToken");
    // setAuthToken()
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    //when there isn't a profile just return an empty object
    dispatch({ type: GET_PROFILE, payload: {} });
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
