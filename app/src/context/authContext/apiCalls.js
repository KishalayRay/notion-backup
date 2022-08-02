import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
export const login = async (user, dispatch) => {
  dispatch(loginStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/auth/login`,
      user
    );
    dispatch(loginSuccess(response.data.data));
    //dispatch(loginSuccess(response.data.data));
  } catch (e) {
    console.log(e);
    dispatch(loginFailure(e.response.data));
  }
};
