import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import axios from "../../api/axios";
export const LoginUser = async (user, dispatch) => {
  dispatch(loginStart);
  try {
    const response = await axios.post(`/auth/login`, user);
    dispatch(
      loginSuccess({
        email: response.data.data.user.email,
        accessToken: response.data.data.accessToken,
      })
    );
    //dispatch(loginSuccess(response.data.data));
  } catch (e) {
    console.log(e);
    dispatch(loginFailure(e.response.data));
  }
};
