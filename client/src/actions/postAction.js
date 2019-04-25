import axios from "axios";
import { ADD_POST, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const addPost = postData => async dispatch => {
  try {
    const res = await axios.post("/api/posts", postData);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
