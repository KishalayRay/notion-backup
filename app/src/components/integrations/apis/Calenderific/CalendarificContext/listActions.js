export const getHolidayStart = () => ({
  type: "GET_HOLIDAYS_START",
});
export const getHolidaySuccess = (holiday) => ({
  type: "GET_HOLIDAYS_SUCCESS",
  payload: holiday,
});
export const getHolidayFailure = () => ({
  type: "GET_HOLIDAYS_FAILURE",
});

export const createHolidayStart = () => ({
  type: "CREATE_HOLIDAYS_START",
});

export const createHolidaySuccess = (holiday) => ({
  type: "CREATE_HOLIDAYS_SUCCESS",
  payload: holiday,
});
export const createHolidayFailure = () => ({
  type: "CREATE_HOLIDAYS_FAILURE",
});
