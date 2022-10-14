export const getLeadStart = () => ({
  type: "GET_LEAD_START",
});
export const getLeadSuccess = (Lead) => ({
  type: "GET_LEAD_SUCCESS",
  payload: Lead,
});
export const getLeadFailure = () => ({
  type: "GET_LEAD_FAILURE",
});

export const createLeadStart = () => ({
  type: "CREATE_LEAD_START",
});

export const createLeadSuccess = (Lead) => ({
  type: "CREATE_LEAD_SUCCESS",
  payload: Lead,
});
export const createLeadFailure = () => ({
  type: "CREATE_LEAD_FAILURE",
});
