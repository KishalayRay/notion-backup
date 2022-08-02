const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        errors: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        errors: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        errors: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        errors: null,
      };
    default: {
      return { ...state };
    }
  }
};

export default AuthReducer;
