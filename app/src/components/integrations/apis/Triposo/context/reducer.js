const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_TRIPS":
      return {
        ...state,
        isLoading: false,
        trips: action.payload.trips,
      };
    case "ADD_TRIP":
      return {
        ...state,
        trips: state.trips.filter((trip, index) => {
          return index !== action.payload;
        }),
      };
    case "SET_SEARCH":
      return {
        ...state,
        query: action.payload,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};
export default Reducer;
