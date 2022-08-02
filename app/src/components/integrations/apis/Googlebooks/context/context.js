import { useEffect, createContext, useReducer } from "react";
import cryptoJS from "crypto-js";
import axios from "axios";
import Reducer from "./reducer";
//b3b93acc
const API = `https://www.googleapis.com/books/v1/volumes?`;
const INITIAL_STATE = {
  isLoading: false,
  books: [],
  query: "",
};

export const GooglebooksContext = createContext(INITIAL_STATE);

export const GooglebooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
      if (data.items) {
        dispatch({
          type: "GET_BOOKS",
          payload: {
            books: data.items,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchBook = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addBook = async (bookId) => {
    dispatch({
      type: "ADD_BOOK",
      payload: bookId,
    });
  };

  const getApiKey = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Googlebooks" },
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
    fetachAPI(`${API}q=${state.query}&key=${apiKey}&maxResults=5`);
  };

  return (
    <GooglebooksContext.Provider
      value={{
        isLoading: state.isLoading,
        books: state.books,
        query: state.query,
        dispatch,
        searchBook,
        getApiKey,
        addBook,
      }}
    >
      {children}
    </GooglebooksContext.Provider>
  );
};
