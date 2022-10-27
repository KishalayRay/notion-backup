import { useEffect, createContext, useReducer } from "react";
import cryptoJS from "crypto-js";
import axios from "axios";

import Reducer from "./reducer";

const API = `https://api.coinpaprika.com/v1/search`;
const INITIAL_STATE = {
  isLoading: false,
  coins: [],
  query: "",
};

export const CoinRankingContext = createContext(INITIAL_STATE);

export const CoinRankingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const fetachAPI = async (api) => {
    dispatch("SET_LOADING");
    try {
      const response = await axios.get(api);
      const data = response.data;
      console.log(data);
      if (data.currencies) {
        dispatch({
          type: "GET_COINS",
          payload: {
            coins: data.currencies,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchCoin = (searchQuery) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchQuery,
    });
  };
  const addCoin = async (id) => {
    dispatch({
      type: "ADD_COIN",
      payload: id,
    });
  };

  const fetchCoin = async () => {
    fetachAPI(`${API}?q=${state.query}`);
  };

  return (
    <CoinRankingContext.Provider
      value={{
        isLoading: state.isLoading,
        coins: state.coins,
        query: state.query,
        fetchCoin,
        dispatch,
        searchCoin,
        addCoin,
      }}
    >
      {children}
    </CoinRankingContext.Provider>
  );
};
