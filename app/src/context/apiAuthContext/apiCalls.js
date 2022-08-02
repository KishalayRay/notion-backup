import axios from "axios";
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

export const createApiAuth = async (apiAuth, dispatch) => {
  dispatch(createApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/notionconfig/newauth/`,
      apiAuth,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    dispatch(createApiAuthSuccess(response.data.data.NotionApi));
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
    dispatch(createApiAuthFailure);
  }
};
export const getApiAuth = async (apiAuth, dispatch) => {
  dispatch(getApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/notionconfig/auth/`,
      apiAuth,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data.data.NotionApi);
    dispatch(getApiAuthSuccess(response.data.data.NotionApi));
  } catch (e) {
    console.log(e);
    dispatch(getApiAuthFailure);
  }
};
export const deleteApiAuth = async (apiAuth, dispatch) => {
  dispatch(deleteApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/notionconfig/`,
      apiAuth,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data.data.NotionApi);
    dispatch(deleteApiAuthSuccess(response.data.data.NotionApi));
  } catch (e) {
    console.log(e);
    dispatch(deleteApiAuthFailure);
  }
};
