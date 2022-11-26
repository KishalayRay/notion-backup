import axios from "axios";
import {
  getCoinStart,
  getCoinFailure,
  getCoinSuccess,
  deleteCoinStart,
  deleteCoinFailure,
  deleteCoinSuccess,
  createCoinStart,
  createCoinSuccess,
  createCoinFailure,
} from "./listActions";
export const GetCoins = async (axiosPrivate, dispatch) => {
  dispatch(getCoinStart);
  try {
    const response = await axiosPrivate.get(`/coinranking/coins`);

    dispatch(getCoinSuccess(response.data.data.coin));
    console.log(response.data.data.coin);
  } catch (e) {
    dispatch(getCoinFailure);
  }
};
export const CreateCoin = async (coinSymbol, axiosPrivate, dispatch) => {
  dispatch(createCoinStart);
  console.log(coinSymbol);
  try {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${coinSymbol}`
    );
    console.log(response);
    const coin = response.data;
    console.log(coin);
    const coinObject = {
      coinName: coin.name,
      coinSymbol: coin.symbol,
      coinPrice: coin.quotes.USD.price.toFixed(4),
      coinDayChange: coin.quotes.USD.market_cap_change_24h,
      coinCirculation: coin.circulating_supply,
      coinRank: coin.rank,
      coinMarketCap: coin.quotes.USD.market_cap,
    };

    const postData = await axiosPrivate.post(`/coinranking/newcoin`, {
      coinName: coin.name,
      coinSymbol: coin.symbol,
      coinPrice: coin.quotes.USD.price.toFixed(4),
      coinDayChange: coin.quotes.USD.market_cap_change_24h,
      coinCirculation: coin.circulating_supply,
      coinRank: coin.rank,
      coinMarketCap: coin.quotes.USD.market_cap,
    });
    console.log(postData.data);
    console.log(coinObject);
    dispatch(createCoinSuccess(coinObject));
  } catch (e) {
    console.log(e);
    dispatch(createCoinFailure);
  }
};

export const DeleteCoin = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteCoinStart);

  try {
    await axiosPrivate.put(`/coinranking/${id}`, {});

    dispatch(deleteCoinSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteCoinFailure);
  }
};
