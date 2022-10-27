import axios from "axios";

import {
  getTripStart,
  getTripFailure,
  getTripSuccess,
  createTripStart,
  createTripSuccess,
  createTripFailure,
  deleteTripStart,
  deleteTripSuccess,
  deleteTripFailure,
} from "./listActions";
export const GetTrips = async (axiosPrivate, dispatch) => {
  dispatch(getTripStart);
  try {
    const response = await axiosPrivate.get(`/triposo/trip`);

    dispatch(getTripSuccess(response.data.data.trips));
    console.log(response.data.data.trips);
  } catch (e) {
    dispatch(getTripFailure);
  }
};
export const CreateTrip = async (query, axiosPrivate, dispatch) => {
  dispatch(createTripStart);
  console.log(query);
  //const uule = createUule(location);
  try {
    const currDate = new Date().toISOString();
    const tripObject = {
      city: query,
      date: currDate,
    };

    const postData = await axiosPrivate.post(`/triposo/newtrip`, {
      city: query,
    });
    console.log(postData.data);
    console.log(tripObject);
    dispatch(createTripSuccess(tripObject));
  } catch (e) {
    console.log(e);
    dispatch(createTripFailure);
  }
};
export const DeleteTrip = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteTripStart);

  try {
    await axiosPrivate.put(`/triposo/${id}`, {});

    dispatch(deleteTripSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteTripFailure);
  }
};
