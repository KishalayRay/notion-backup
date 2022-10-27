export const getCoinStart = () => ({
  type: "GET_COIN_START",
});
export const getCoinSuccess = (coins) => ({
  type: "GET_COIN_SUCCESS",
  payload: coins,
});
export const getCoinFailure = () => ({
  type: "GET_COIN_FAILURE",
});

export const createCoinStart = () => ({
  type: "CREATE_COIN_START",
});

export const createCoinSuccess = (coin) => ({
  type: "CREATE_COIN_SUCCESS",
  payload: coin,
});
export const createCoinFailure = () => ({
  type: "CREATE_COIN_FAILURE",
});

export const deleteCoinStart = () => ({
  type: "DELETE_COIN_START",
});

export const deleteCoinSuccess = (id) => ({
  type: "DELETE_COIN_SUCCESS",
  payload: id,
});
export const deleteCoinFailure = () => ({
  type: "DELETE_COIN_FAILURE",
});
