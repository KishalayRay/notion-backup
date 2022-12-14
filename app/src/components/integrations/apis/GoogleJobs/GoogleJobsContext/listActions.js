export const getJobsStart = () => ({
  type: "GET_JOBS_START",
});
export const getJobsSuccess = (job) => ({
  type: "GET_JOBS_SUCCESS",
  payload: job,
});
export const getJobsFailure = () => ({
  type: "GET_JOBS_FAILURE",
});

export const createJobsStart = () => ({
  type: "CREATE_JOBS_START",
});

export const createJobsSuccess = (job) => ({
  type: "CREATE_JOBS_SUCCESS",
  payload: job,
});
export const createJobsFailure = () => ({
  type: "CREATE_JOBS_FAILURE",
});
export const deleteJobsStart = () => ({
  type: "DELETE_JOBS_START",
});
export const deleteJobsSuccess = (id) => ({
  type: "DELETE_JOBS_SUCCESS",
  payload: id,
});
export const deleteJobsFailure = () => ({
  type: "DELETE_JOBS_FAILURE",
});
