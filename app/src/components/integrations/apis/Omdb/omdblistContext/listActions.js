export const getOmdbStart = () => ({
  type: "GET_MOVIES_START",
});
export const getOmdbSuccess = (omdb, pageCount) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: { omdb, pageCount },
});
export const getOmdbFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});

export const createOmdbStart = () => ({
  type: "CREATE_MOVIES_START",
});

export const createOmdbSuccess = (movie) => ({
  type: "CREATE_MOVIES_SUCCESS",
  payload: movie,
});
export const createOmdbFailure = (error) => ({
  type: "CREATE_MOVIES_FAILURE",
  payload: error,
});

export const deleteOmdbStart = () => ({
  type: "DELETE_MOVIES_START",
});

export const deleteOmdbSuccess = (id) => ({
  type: "DELETE_MOVIES_SUCCESS",
  payload: id,
});
export const deleteOmdbFailure = () => ({
  type: "DELETE_MOVIES_FAILURE",
});
