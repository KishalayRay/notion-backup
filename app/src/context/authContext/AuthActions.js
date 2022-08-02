export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const loginFailure = (errors) => ({
  type: "LOGIN_FAILURE",
  payload: errors,
});
export const logout = () => ({
  type: "LOGOUT",
});
