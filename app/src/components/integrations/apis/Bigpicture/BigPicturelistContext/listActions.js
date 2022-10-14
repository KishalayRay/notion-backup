export const getBigPictureStart = () => ({
  type: "GET_COMPANY_START",
});
export const getBigPictureSuccess = (companies) => ({
  type: "GET_COMPANY_SUCCESS",
  payload: companies,
});
export const getBigPictureFailure = () => ({
  type: "GET_COMPANY_FAILURE",
});

export const createBigPictureStart = () => ({
  type: "CREATE_COMPANY_START",
});

export const createBigPictureSuccess = (company) => ({
  type: "CREATE_COMPANY_SUCCESS",
  payload: company,
});
export const createBigPictureFailure = () => ({
  type: "CREATE_COMPANY_FAILURE",
});

export const deleteBigPictureStart = () => ({
  type: "DELETE_COMPANY_START",
});

export const deleteBigPictureSuccess = (id) => ({
  type: "DELETE_COMPANY_SUCCESS",
  payload: id,
});
export const deleteBigPictureFailure = () => ({
  type: "DELETE_COMPANY_FAILURE",
});
