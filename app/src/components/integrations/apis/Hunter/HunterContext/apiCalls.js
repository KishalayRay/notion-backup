import axios from "axios";

import {
  getLeadStart,
  getLeadFailure,
  getLeadSuccess,
  createLeadStart,
  createLeadSuccess,
  createLeadFailure,
  deleteLeadStart,
  deleteLeadSuccess,
  deleteLeadFailure,
} from "./listActions";
export const GetLeads = async (axiosPrivate, dispatch) => {
  dispatch(getLeadStart);
  try {
    const response = await axiosPrivate.get(`/hunter/leads`);

    dispatch(getLeadSuccess(response.data.data.leads));
    console.log(response.data.data.leads);
  } catch (e) {
    dispatch(getLeadFailure);
  }
};
export const CreateLead = async (domain, axiosPrivate, dispatch) => {
  dispatch(createLeadStart);

  try {
    const currDate = new Date().toISOString();

    const leadObject = {
      domain: domain,
      date: currDate,
    };

    const postData = await axiosPrivate.post(`/hunter/newlead`, {
      domain: domain,
    });
    console.log(postData.data);
    console.log(leadObject);
    dispatch(createLeadSuccess(leadObject));
  } catch (e) {
    console.log(e);
    dispatch(createLeadFailure);
  }
};
export const DeleteLead = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteLeadStart);

  try {
    await axiosPrivate.put(`/hunter/${id}`, {});

    dispatch(deleteLeadSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteLeadFailure);
  }
};
