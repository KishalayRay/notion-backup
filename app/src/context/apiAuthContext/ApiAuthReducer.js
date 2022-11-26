const ApiAuthReducer = (state, action) => {
  switch (action.type) {
    case "GET_APIAUTH_START":
      return {
        ...state,
        apiAuth: null,
        isFetching: true,
        error: false,
      };
    case "GET_APIAUTH_SUCCESS":
      return {
        ...state,
        apiAuth: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_APIAUTH_FAILURE":
      return {
        ...state,
        apiAuth: null,
        isFetching: false,
        error: true,
      };
    case "CREATE_APIAUTH_START":
      return {
        ...state,
        apiAuth: null,
        isFetching: true,
        error: false,
      };
    case "CREATE_APIAUTH_SUCCESS":
      return {
        ...state,
        apiAuth: action.payload,
        isFetching: false,
        error: false,
      };
    case "CREATE_APIAUTH_FAILURE":
      return {
        ...state,
        apiAuth: null,
        isFetching: false,
        error: true,
      };
    case "DELETE_APIAUTH_START":
      return {
        ...state,

        isFetching: true,
        error: false,
      };
    case "DELETE_APIAUTH_SUCCESS":
      return {
        ...state,
        apiAuth: null,
        isFetching: false,
        error: false,
      };
    case "DELETE_APIAUTH_FAILURE":
      return {
        ...state,

        isFetching: false,
        error: true,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
export default ApiAuthReducer;
