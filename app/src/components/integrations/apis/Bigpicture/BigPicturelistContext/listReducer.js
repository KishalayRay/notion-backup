const BigPictureReducer = (state, action) => {
  switch (action.type) {
    case "GET_COMPANY_START":
      return {
        companies: [],
        isFetching: true,
        error: false,
      };
    case "GET_COMPANY_SUCCESS":
      return {
        companies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_COMPANY_FAILURE":
      return {
        companies: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_COMPANY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_COMPANY_SUCCESS":
      return {
        companies: [...state.companies, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_COMPANY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_COMPANY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_COMPANY_SUCCESS":
      return {
        companies: state.companies.filter((company) => {
          return company._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_COMPANY_FAILURE":
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
export default BigPictureReducer;
