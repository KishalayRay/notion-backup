export const getTripStart = () => ({
  type: "GET_TRIP_START",
});
export const getTripSuccess = (trips) => ({
  type: "GET_TRIP_SUCCESS",
  payload: trips,
});
export const getTripFailure = () => ({
  type: "GET_TRIP_FAILURE",
});

export const createTripStart = () => ({
  type: "CREATE_TRIP_START",
});

export const createTripSuccess = (trip) => ({
  type: "CREATE_TRIP_SUCCESS",
  payload: trip,
});
export const createTripFailure = () => ({
  type: "CREATE_TRIP_FAILURE",
});

export const deleteTripStart = () => ({
  type: "DELETE_TRIP_START",
});

export const deleteTripSuccess = (id) => ({
  type: "DELETE_TRIP_SUCCESS",
  payload: id,
});
export const deleteTripFailure = () => ({
  type: "DELETE_TRIP_FAILURE",
});
