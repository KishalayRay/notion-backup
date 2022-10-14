export const getNewsStart = () => ({
  type: "GET_NEWS_START",
});
export const getNewsSuccess = (news) => ({
  type: "GET_NEWS_SUCCESS",
  payload: news,
});
export const getNewsFailure = () => ({
  type: "GET_NEWS_FAILURE",
});

export const createNewsStart = () => ({
  type: "CREATE_NEWS_START",
});

export const createNewsSuccess = (news) => ({
  type: "CREATE_NEWS_SUCCESS",
  payload: news,
});
export const createNewsFailure = () => ({
  type: "CREATE_NEWS_FAILURE",
});
