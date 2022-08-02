export const createApiAuthStart = () => ({
  type: "CREATE_APIAUTH_START",
});
export const createApiAuthSuccess = (apiKey) => ({
  type: "CREATE_APIAUTH_SUCCESS",
  payload: apiKey,
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
export const deleteApiAuthSuccess = (apiAuth) => ({
  type: "GET_APIAUTH_SUCCESS",
  payload: apiAuth,
});
export const deleteApiAuthFailure = () => ({
  type: "GET_APIAUTH_FAILURE",
});
