import { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";

const API = `https://api.api-ninjas.com/v1/urllookup`;
const INITIAL_STATE = {
  isLoading: false,
  companies: {},
  query: "",
};

export const HunterContext = createContext(INITIAL_STATE);

export const HunterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api, {
        headers: {
          "X-Api-Key": "54F1Ha4e0uAJqYAF6YnW3w==8O6HjZsKCNBgjCmr",
        },
      });
      const data = response.data;
      console.log(data);
      if (data.is_valid === false) {
        dispatch({
          type: "GET_COMPANIES",
          payload: {
            companies: {},
          },
        });
      }
      if (data) {
        dispatch({
          type: "GET_COMPANIES",
          payload: {
            companies: data,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchLead = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addLead = async () => {
    dispatch({
      type: "ADD_COMPANY",
    });
  };

  const getApiKey = async (axiosPrivate) => {
    fetachAPI(`${API}?url=${state.query}`);
  };

  return (
    <HunterContext.Provider
      value={{
        isLoading: state.isLoading,
        leads: state.leads,
        query: state.query,
        dispatch,
        searchLead,
        getApiKey,
        addLead,
      }}
    >
      {children}
    </HunterContext.Provider>
  );
};
