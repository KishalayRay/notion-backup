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
export const GetStocks = async (axiosPrivate, dispatch) => {
  dispatch(getStockStart);
  try {
    const response = await axiosPrivate.get(`/stockdata/stocks`);

    dispatch(getStockSuccess(response.data.data.Stock));
    console.log(response.data.data.Stock);
  } catch (e) {
    dispatch(getStockFailure);
  }
};
export const CreateStock = async (stockSymbol, axiosPrivate, dispatch) => {
  dispatch(createStockStart);
  console.log(stockSymbol);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Alphavantage",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

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

    const postData = await axiosPrivate.post(`/stockdata/newstock`, {
      stockSymbol: stock["01. symbol"],
      stockPrice: stock["05. price"],
      stockDayChange: stock["09. change"],
      stockDayChangeParcentage: stock["10. change percent"],
      stockDayHigh: stock["03. high"],
      stockDayLow: stock["04. low"],
    });
    console.log(postData.data);
    console.log(stockObject);
    dispatch(createStockSuccess(stockObject));
  } catch (e) {
    console.log(e);
    dispatch(createStockFailure);
  }
};

export const DeleteStock = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteStockStart);

  try {
    await axiosPrivate.put(`/stockdata/${id}`, {});

    dispatch(deleteStockSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteStockFailure);
  }
};
