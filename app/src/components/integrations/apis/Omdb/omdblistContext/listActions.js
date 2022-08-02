export const getOmdbStart = () => ({
  type: "GET_MOVIES_START",
});
export const getOmdbSuccess = (omdb) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: omdb,
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
export const createOmdbFailure = () => ({
  type: "CREATE_MOVIES_FAILURE",
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
