export const getStockStart = () => ({
  type: "GET_STOCK_START",
});
export const getStockSuccess = (stocks) => ({
  type: "GET_STOCK_SUCCESS",
  payload: stocks,
});
export const getStockFailure = () => ({
  type: "GET_STOCK_FAILURE",
});

export const createStockStart = () => ({
  type: "CREATE_STOCK_START",
});

export const createStockSuccess = (stock) => ({
  type: "CREATE_STOCK_SUCCESS",
  payload: stock,
});
export const createStockFailure = () => ({
  type: "CREATE_STOCK_FAILURE",
});

export const deleteStockStart = () => ({
  type: "DELETE_STOCK_START",
});

export const deleteStockSuccess = (id) => ({
  type: "DELETE_STOCK_SUCCESS",
  payload: id,
});
export const deleteStockFailure = () => ({
  type: "DELETE_STOCK_FAILURE",
});
