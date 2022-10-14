export const getKeywordStart = () => ({
  type: "GET_KEYWORD_START",
});
export const getKeywordSuccess = (keyword) => ({
  type: "GET_KEYWORD_SUCCESS",
  payload: keyword,
});
export const getKeywordFailure = () => ({
  type: "GET_KEYWORD_FAILURE",
});

export const createKeywordStart = () => ({
  type: "CREATE_KEYWORD_START",
});

export const createKeywordSuccess = (keyword) => ({
  type: "CREATE_KEYWORD_SUCCESS",
  payload: keyword,
});
export const createKeywordFailure = () => ({
  type: "CREATE_KEYWORD_FAILURE",
});
