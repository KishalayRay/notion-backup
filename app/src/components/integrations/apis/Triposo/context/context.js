import { useEffect, createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";

const API = `https://www.triposo.com/api/20221011/location.json`;
const INITIAL_STATE = {
  isLoading: false,
  trips: [],
  query: "",
};

export const TriposoContext = createContext(INITIAL_STATE);

export const TriposoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
      if (data.results) {
        dispatch({
          type: "GET_TRIPS",
          payload: {
            trips: data.results,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchTrip = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addTrip = async (id) => {
    dispatch({
      type: "ADD_TRIP",
      payload: id,
    });
  };

  const getApiKey = async (axiosPrivate) => {
    const response = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Triposo",
    });
    const apiKey = response.data.data.ApiKey.keys[0].key;

    fetachAPI(
      `${API}?account=${apiKey.slice(0, 8)}&token=${apiKey.slice(
        8
      )}&tag_labels=city&annotate=trigram:${
        state.query
      }&trigram=>=0.3&count=10&fields=id,name,score,country_id,parent_id,snippet&order_by=-trigram`
    );
  };

  return (
    <TriposoContext.Provider
      value={{
        isLoading: state.isLoading,
        trips: state.trips,
        query: state.query,
        dispatch,
        searchTrip,
        getApiKey,
        addTrip,
      }}
    >
      {children}
    </TriposoContext.Provider>
  );
};
