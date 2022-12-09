import {
  createApiAuthStart,
  createApiAuthSuccess,
  createApiAuthFailure,
  getApiAuthStart,
  getApiAuthSuccess,
  getApiAuthFailure,
  deleteApiAuthStart,
  deleteApiAuthSuccess,
  deleteApiAuthFailure,
} from "./DataApiActions";

export const CreateApiKey = async (apiKey, axiosPrivate, dispatch) => {
  console.log(apiKey);
  dispatch(createApiAuthStart);

  try {
    const response = await axiosPrivate.post(`/apiconfig/newkey`, apiKey);
    dispatch(createApiAuthSuccess(response.data.data.ApiKey));
    console.log(response.data.data.ApiKey);
  } catch (error) {
    console.log(error);
    dispatch(createApiAuthFailure);
  }
};
export const GetApiKey = async (apiAuth, axiosPrivate, dispatch) => {
  dispatch(getApiAuthStart);
  try {
    const response = await axiosPrivate.post(`/apiconfig/key`, apiAuth);
    console.log(response.data.data.ApiKey);
    dispatch(getApiAuthSuccess(response.data.data.ApiKey));
  } catch (e) {
    console.log(e);

    dispatch(getApiAuthFailure);
  }
};
export const DeleteApiKey = async (apiAuth, axiosPrivate, dispatch) => {
  console.log(apiAuth);
  dispatch(deleteApiAuthStart);
  try {
    const response = await axiosPrivate.post(`/apiconfig/`, apiAuth);
    console.log();
    dispatch(deleteApiAuthSuccess());
  } catch (e) {
    console.log(e);

    dispatch(deleteApiAuthFailure);
  }
};
