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
} from "./ApiAuthActions";

export const CreateApiAuth = async (apiAuth, axiosPrivate, dispatch) => {
  dispatch(createApiAuthStart);
  try {
    const response = await axiosPrivate.post(`/notionconfig/newauth/`, apiAuth);
    dispatch(createApiAuthSuccess(response.data.data.NotionApi));
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
    dispatch(createApiAuthFailure);
  }
};
export const GetApiAuth = async (apiAuth, axiosPrivate, dispatch) => {
  dispatch(getApiAuthStart);
  try {
    const response = await axiosPrivate.post(`/notionconfig/auth/`, apiAuth);
    console.log(response.data.data.NotionApi);
    dispatch(getApiAuthSuccess(response.data.data.NotionApi));
  } catch (e) {
    console.log(e);
    dispatch(getApiAuthFailure);
  }
};
export const DeleteApiAuth = async (apiAuth, axiosPrivate, dispatch) => {
  dispatch(deleteApiAuthStart);
  try {
    const response = await axiosPrivate.post(`/notionconfig/`, apiAuth);
    console.log();
    dispatch(deleteApiAuthSuccess());
  } catch (e) {
    console.log(e);
    dispatch(deleteApiAuthFailure);
  }
};
