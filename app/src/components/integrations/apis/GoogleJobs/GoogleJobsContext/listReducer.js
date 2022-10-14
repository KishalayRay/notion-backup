const GoogleJobsReducer = (state, action) => {
  switch (action.type) {
    case "GET_JOBS_START":
      return {
        jobs: [],
        isFetching: true,
        error: false,
      };
    case "GET_JOBS_SUCCESS":
      return {
        jobs: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_JOBS_FAILURE":
      return {
        jobs: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_JOBS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_JOBS_SUCCESS":
      return {
        jobs: [...state.jobs, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_JOBS_FAILURE":
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
export default GoogleJobsReducer;
