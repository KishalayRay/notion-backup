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
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
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

  const getApiKey = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Omdb" },
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    const hashedData = response.data.data.ApiKey.keys[0].key;
    console.log(hashedData);
    const apiKey = cryptoJS.AES.decrypt(
      hashedData,
      "3DNFRo2no81p8KUEIN47B%$^&6c4876"
    ).toString(cryptoJS.enc.Utf8);
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
