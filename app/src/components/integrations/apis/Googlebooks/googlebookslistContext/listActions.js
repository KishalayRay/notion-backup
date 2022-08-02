export const getGooglebookStart = () => ({
  type: "GET_BOOKS_START",
});
export const getGooglebookSuccess = (book) => ({
  type: "GET_BOOKS_SUCCESS",
  payload: book,
});
export const getGooglebookFailure = () => ({
  type: "GET_BOOKS_FAILURE",
});

export const createGooglebookStart = () => ({
  type: "CREATE_BOOKS_START",
});

export const createGooglebookSuccess = (movie) => ({
  type: "CREATE_BOOKS_SUCCESS",
  payload: movie,
});
export const createGooglebookFailure = () => ({
  type: "CREATE_BOOKS_FAILURE",
});

export const deleteGooglebookStart = () => ({
  type: "DELETE_BOOKS_START",
});

export const deleteGooglebookSuccess = (id) => ({
  type: "DELETE_BOOKS_SUCCESS",
  payload: id,
});
export const deleteGooglebookFailure = () => ({
  type: "DELETE_BOOKS_FAILURE",
});
