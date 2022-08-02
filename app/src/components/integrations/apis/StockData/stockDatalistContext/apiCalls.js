import axios from "axios";
import cryptoJS from "crypto-js";

import {
  getStockStart,
  getStockFailure,
  getStockSuccess,
  deleteStockStart,
  deleteStockFailure,
  deleteStockSuccess,
  createStockStart,
  createStockSuccess,
  createStockFailure,
} from "./listActions";
export const getStocks = async (dispatch) => {
  dispatch(getStockStart);
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/stockdata/stocks`,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );

    dispatch(getStockSuccess(response.data.data.Stock));
    console.log(response.data.data.Stock);
  } catch (e) {
    dispatch(getStockFailure);
  }
};
export const createStock = async (stockSymbol, dispatch) => {
  dispatch(createStockStart);
  console.log(stockSymbol);
  try {
    const res = await axios.post(
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
    const hashedData = res.data.data.ApiKey.keys[0].key;
    console.log(hashedData);
    const apiKey = cryptoJS.AES.decrypt(
      hashedData,
      "3DNFRo2no81p8KUEIN47B%$^&6c4876"
    ).toString(cryptoJS.enc.Utf8);
    console.log(apiKey);
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`
    );
    console.log(response);
    const stock = response.data["Global Quote"];
    console.log(stock);
    const stockObject = {
      stockSymbol: stock["01. symbol"],
      stockPrice: stock["05. price"],
      stockDayChange: stock["09. change"],
      stockDayChangeParcentage: stock["10. change percent"],
      stockDayHigh: stock["03. high"],
      stockDayLow: stock["04. low"],
    };

    const postData = await axios.post(
      `http://localhost:8000/api/v1/stockdata/newstock`,
      {
        stockSymbol: stock["01. symbol"],
        stockPrice: stock["05. price"],
        stockDayChange: stock["09. change"],
        stockDayChangeParcentage: stock["10. change percent"],
        stockDayHigh: stock["03. high"],
        stockDayLow: stock["04. low"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(postData.data);
    console.log(stockObject);
    dispatch(createStockSuccess(stockObject));
  } catch (e) {
    console.log(e);
    dispatch(createStockFailure);
  }
};

export const deleteStock = async (id, dispatch) => {
  dispatch(deleteStockStart);

  try {
    await axios.put(
      `http://localhost:8000/api/v1/stockdata/${id}`,
      {},
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );

    dispatch(deleteStockSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteStockFailure);
  }
};
