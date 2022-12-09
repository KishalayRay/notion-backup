const HunterReducer = (state, action) => {
  switch (action.type) {
    case "GET_LEAD_START":
      return {
        leads: [],
        isFetching: true,
        error: false,
      };
    case "GET_LEAD_SUCCESS":
      return {
        leads: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LEAD_FAILURE":
      return {
        leads: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_LEAD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_LEAD_SUCCESS":
      return {
        leads: [...state.leads, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LEAD_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_LEAD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_LEAD_SUCCESS":
      return {
        leads: state.leads.filter((lead) => {
          return lead._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_LEAD_FAILURE":
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
export default HunterReducer;
