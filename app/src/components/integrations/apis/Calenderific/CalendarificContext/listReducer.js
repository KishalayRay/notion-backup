const CalendaridicReducer = (state, action) => {
  switch (action.type) {
    case "GET_HOLIDAYS_START":
      return {
        holiday: [],
        isFetching: true,
        error: false,
      };
    case "GET_HOLIDAYS_SUCCESS":
      return {
        holiday: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_HOLIDAYS_FAILURE":
      return {
        holiday: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_HOLIDAYS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_HOLIDAYS_SUCCESS":
      return {
        holiday: [...state.holiday, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_HOLIDAYS_FAILURE":
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
export default CalendaridicReducer;
