const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        isLoading: false,
        activities: action.payload.activities,
      };
    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter((activity, index) => {
          return index !== action.payload;
        }),
      };
    case "SET_SEARCH":
      return {
        ...state,
        weight: action.payload.weightM,
        duration: action.payload.durationM,
        activity: action.payload.activityM,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};
export default Reducer;
