export const createApiAuthStart = () => ({
  type: "CREATE_APIAUTH_START",
});
export const createApiAuthSuccess = (apiAuth) => ({
  type: "CREATE_APIAUTH_SUCCESS",
  payload: apiAuth,
});
export const createApiAuthFailure = () => ({
  type: "CREATE_APIAUTH_FAILURE",
});
export const getApiAuthStart = () => ({
  type: "GET_APIAUTH_START",
});
export const getApiAuthSuccess = (apiAuth) => ({
  type: "GET_APIAUTH_SUCCESS",
  payload: apiAuth,
});
export const getApiAuthFailure = () => ({
  type: "GET_APIAUTH_FAILURE",
});
export const deleteApiAuthStart = () => ({
  type: "GET_APIAUTH_START",
});
export const deleteApiAuthSuccess = () => ({
  type: "GET_APIAUTH_SUCCESS",
});
export const deleteApiAuthFailure = () => ({
  type: "GET_APIAUTH_FAILURE",
});
