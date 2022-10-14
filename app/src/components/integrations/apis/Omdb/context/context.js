import { useEffect, createContext, useReducer } from "react";

import cryptoJS from "crypto-js";
import axios from "axios";
import Reducer from "./reducer";
//b3b93acc
const API = `http://www.omdbapi.com/`;
const INITIAL_STATE = {
  isLoading: false,
  movies: [],
  query: "",
};

export const OmdbContext = createContext(INITIAL_STATE);

export const OmdbContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    //let cancelToken;
    // if (typeof cancelToken !== typeof undefined) {
    //   cancelToken.cancel("Operation canceled by the user.");
    // }
    // cancelToken = axios.CancelToken.source();
    //{ cancelToken: cancelToken.token }
    try {
      const response = await axios.get(api);
      const data = await response.data;
      console.log(data);
      if (data.Error === "Movie not found!" && data.Response === "False") {
        dispatch({
          type: "GET_MOVIES",
          payload: {
            movies: [],
          },
        });
      }
      if (data.Search) {
        dispatch({
          type: "GET_MOVIES",
          payload: {
            movies: data.Search,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchMovie = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addMovie = async (movieId) => {
    dispatch({
      type: "ADD_MOVIE",
      payload: movieId,
    });
  };

  const getApiKey = async (axiosPrivate) => {
    const response = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Omdb",
    });
    const apiKey = response.data.data.ApiKey.keys[0].key;

    fetachAPI(`${API}?apikey=${apiKey}&s=${state.query}`);
  };

  return (
    <OmdbContext.Provider
      value={{
        isLoading: state.isLoading,
        movies: state.movies,
        query: state.query,
        dispatch,
        searchMovie,
        getApiKey,
        addMovie,
      }}
    >
      {children}
    </OmdbContext.Provider>
  );
};
