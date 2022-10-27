const TriposoReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRIP_START":
      return {
        trips: [],
        isFetching: true,
        error: false,
      };
    case "GET_TRIP_SUCCESS":
      return {
        trips: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_TRIP_FAILURE":
      return {
        trips: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_TRIP_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_TRIP_SUCCESS":
      return {
        trips: [...state.trips, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_TRIP_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_TRIP_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_TRIP_SUCCESS":
      return {
        trips: state.trips.filter((trip) => {
          return trip._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_TRIP_FAILURE":
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
export default TriposoReducer;
