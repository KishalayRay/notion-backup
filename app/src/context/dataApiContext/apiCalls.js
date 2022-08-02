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
} from "./DataApiActions";

export const createApiKey = async (apiKey, dispatch) => {
  dispatch(createApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/newkey`,
      apiKey,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    dispatch(createApiAuthSuccess(response.data.data.ApiKey));
    console.log(response.data.data.ApiKey);
  } catch (error) {
    console.log(error);
    dispatch(createApiAuthFailure);
  }
};
export const getApiKey = async (apiAuth, dispatch) => {
  dispatch(getApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      apiAuth,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data.data.ApiKey);
    dispatch(getApiAuthSuccess(response.data.data.ApiKey));
  } catch (e) {
    console.log(e);
    dispatch(getApiAuthFailure);
  }
};
export const deleteApiKey = async (apiAuth, dispatch) => {
  dispatch(deleteApiAuthStart);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/`,
      apiAuth,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data.data.ApiKey);
    dispatch(deleteApiAuthSuccess(response.data.data.ApiKey));
  } catch (e) {
    console.log(e);
    dispatch(deleteApiAuthFailure);
  }
};
