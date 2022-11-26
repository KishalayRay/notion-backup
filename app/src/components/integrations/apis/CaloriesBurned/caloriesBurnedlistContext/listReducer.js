const CaloriesBurnedReducer = (state, action) => {
  switch (action.type) {
    case "GET_ACTIVITIES_START":
      return {
        activity: [],
        isFetching: true,
        error: false,
      };
    case "GET_ACTIVITIES_SUCCESS":
      return {
        activity: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ACTIVITIES_FAILURE":
      return {
        activity: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_ACTIVITIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_ACTIVITIES_SUCCESS":
      return {
        activity: [...state.activity, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_ACTIVITIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_ACTIVITIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ACTIVITIES_SUCCESS":
      return {
        activity: state.activity.filter((exercise) => {
          return exercise.activityId !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_ACTIVITIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "NEXT_PAGE": {
      let page = state.pageId + 1;
      if (page > state.pageCount) {
        page = 1;
      }
      return {
        ...state,
        pageId: page,
      };
    }

    case "PREV_PAGE": {
      let page = state.pageId - 1;
      if (page < 1) {
        page = 1;
      }
      return {
        ...state,
        pageId: page,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default CaloriesBurnedReducer;
