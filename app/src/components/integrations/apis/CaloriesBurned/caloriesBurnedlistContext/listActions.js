export const getActivityStart = () => ({
  type: "GET_ACTIVITIES_START",
});
export const getActivitySuccess = (activity) => ({
  type: "GET_ACTIVITIES_SUCCESS",
  payload: activity,
});
export const getActivityFailure = () => ({
  type: "GET_ACTIVITIES_FAILURE",
});

export const createActivityStart = () => ({
  type: "CREATE_ACTIVITIES_START",
});

export const createActivitySuccess = (activity) => ({
  type: "CREATE_ACTIVITIES_SUCCESS",
  payload: activity,
});
export const createActivityFailure = () => ({
  type: "CREATE_ACTIVITIES_FAILURE",
});

export const deleteActivityStart = () => ({
  type: "DELETE_ACTIVITIES_START",
});

export const deleteActivitySuccess = (id) => ({
  type: "DELETE_ACTIVITIES_SUCCESS",
  payload: id,
});
export const deleteActivityFailure = () => ({
  type: "DELETE_ACTIVITIES_FAILURE",
});
