import { useEffect, createContext, useReducer } from "react";
import cryptoJS from "crypto-js";
import axios from "axios";
import Reducer from "./reducer";
//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=6EVJC4GUG314HLKB
const API = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH`;
const INITIAL_STATE = {
  isLoading: false,
  stocks: [],
  query: "",
};

export const StockDataContext = createContext(INITIAL_STATE);

export const StockDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
      if (data.bestMatches) {
        dispatch({
          type: "GET_STOCKS",
          payload: {
            stocks: data.bestMatches,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchStock = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addStock = async (stockSymbol) => {
    dispatch({
      type: "ADD_STOCK",
      payload: stockSymbol,
    });
  };

  const fetchStock = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Alphavantage" },
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
    fetachAPI(`${API}&keywords=${state.query}&apikey=${apiKey}`);
  };

  return (
    <StockDataContext.Provider
      value={{
        isLoading: state.isLoading,
        stocks: state.stocks,
        query: state.query,
        fetchStock,
        dispatch,
        searchStock,
        addStock,
      }}
    >
      {children}
    </StockDataContext.Provider>
  );
};
