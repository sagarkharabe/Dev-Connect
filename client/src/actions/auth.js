import { REGISTER_USER } from "./types";
import axios from "axios";
export const registerUser = newUser => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", newUser);
    dispatch({ type: REGISTER_USER, payload: res.data });
  } catch (err) {}
};
