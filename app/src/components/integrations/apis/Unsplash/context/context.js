import { useEffect, createContext, useReducer } from "react";
import cryptoJS from "crypto-js";
import axios from "axios";
import Reducer from "./reducer";
//https://api.unsplash.com/search/photos?client_id=g7_LPxCD-Diz-CW82zq2NsXoppQy8z32FaMzijFNS0E&query=lemon&page=1
const API = `https://api.unsplash.com/search/photos?`;
const INITIAL_STATE = {
  isLoading: false,
  photos: [],
  query: "",
};

export const UnsplashContext = createContext(INITIAL_STATE);

export const UnsplashContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
      if (data.results) {
        dispatch({
          type: "GET_PHOTOS",
          payload: {
            photos: data.results,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchPhoto = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addPhoto = async (photoId) => {
    dispatch({
      type: "ADD_STOCK",
      payload: photoId,
    });
  };

  const fetchPhoto = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Unsplash" },
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data);
    const hashedData = response.data.data.ApiKey.keys[0].key;
    console.log(hashedData);
    const apiKey = cryptoJS.AES.decrypt(
      hashedData,
      "3DNFRo2no81p8KUEIN47B%$^&6c4876"
    ).toString(cryptoJS.enc.Utf8);
    fetachAPI(`${API}client_id=${apiKey}&query=${state.query}&per_page=5`);
  };

  return (
    <UnsplashContext.Provider
      value={{
        isLoading: state.isLoading,
        photos: state.photos,
        query: state.query,
        fetchPhoto,
        dispatch,
        searchPhoto,
        addPhoto,
      }}
    >
      {children}
    </UnsplashContext.Provider>
  );
};
