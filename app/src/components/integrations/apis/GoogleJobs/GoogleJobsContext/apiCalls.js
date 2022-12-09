import axios from "axios";

import {
  getJobsStart,
  getJobsFailure,
  getJobsSuccess,
  createJobsStart,
  createJobsSuccess,
  createJobsFailure,
  deleteJobsStart,
  deleteJobsSuccess,
  deleteJobsFailure,
} from "./listActions";
export const GetJobs = async (axiosPrivate, dispatch) => {
  dispatch(getJobsStart);
  try {
    const response = await axiosPrivate.get(`/googlejobs/jobs`);

    dispatch(getJobsSuccess(response.data.data.jobs));
    console.log(response.data.data.jobs);
  } catch (e) {
    dispatch(getJobsFailure);
  }
};
export const CreateJob = async (query, location, axiosPrivate, dispatch) => {
  dispatch(createJobsStart);
  console.log(query, location);
  //const uule = createUule(location);
  try {
    const currDate = new Date().toISOString();
    const jobObject = {
      jobTitle: query,
      jobLocation: location,
      date: currDate,
    };

    const postData = await axiosPrivate.post(`/googlejobs/newjob`, {
      jobTitle: query,
      jobLocation: location,
    });
    console.log(postData.data);
    console.log(jobObject);
    dispatch(createJobsSuccess(jobObject));
  } catch (e) {
    console.log(e);
    dispatch(createJobsFailure);
  }
};
export const DeleteJob = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteJobsStart);

  try {
    await axiosPrivate.put(`/googlejobs/${id}`, {});

    dispatch(deleteJobsSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteJobsFailure);
  }
};
