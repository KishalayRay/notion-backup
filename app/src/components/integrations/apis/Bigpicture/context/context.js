import { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";

const API = `https://company.bigpicture.io/v2/companies/search`;
const INITIAL_STATE = {
  isLoading: false,
  companies: [],
  query: "",
};

export const BigPictureContext = createContext(INITIAL_STATE);

export const BigPictureContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api, apiKey) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: apiKey,
        },
      });
      const data = response.data;
      console.log(data);
      if (data.data) {
        dispatch({
          type: "GET_COMPANIES",
          payload: {
            companies: data.data,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchCompany = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addCompany = async (index) => {
    dispatch({
      type: "ADD_COMPANY",
      payload: index,
    });
  };

  const getApiKey = async (axiosPrivate) => {
    const response = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Bigpicture",
    });
    const apiKey = response.data.data.ApiKey.keys[0].key;

    fetachAPI(`${API}?name=${state.query}`, apiKey);
  };

  return (
    <BigPictureContext.Provider
      value={{
        isLoading: state.isLoading,
        companies: state.companies,
        query: state.query,
        dispatch,
        searchCompany,
        getApiKey,
        addCompany,
      }}
    >
      {children}
    </BigPictureContext.Provider>
  );
};
