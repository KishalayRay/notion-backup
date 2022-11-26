import axios from "axios";
import {
  getActivityStart,
  getActivityFailure,
  getActivitySuccess,
  deleteActivityStart,
  deleteActivityFailure,
  deleteActivitySuccess,
  createActivityStart,
  createActivitySuccess,
  createActivityFailure,
} from "./listActions";
import uniqid from "uniqid";
export const GetActivities = async (axiosPrivate, dispatch) => {
  dispatch(getActivityStart);
  try {
    const response = await axiosPrivate.get(`/caloriesburned/activities`);

    dispatch(getActivitySuccess(response.data.data.activities));
    console.log(response.data.data.activities);
  } catch (e) {
    dispatch(getActivityFailure);
  }
};
export const CreateActivity = async (
  index,
  axiosPrivate,
  dispatch,
  weightM,
  durationM,
  activityM
) => {
  dispatch(createActivityStart);
  console.log(index);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Caloriesburned",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const response = await axios.get(
      `https://api.api-ninjas.com/v1/caloriesburned?activity=${activityM}&weight=${weightM}&duration=${durationM}`,
      {
        headers: { "X-Api-Key": apiKey },
      }
    );
    const activities = response.data;
    const activity = activities[index];
    console.log(activity);
    const activityObject = {
      activityId: uniqid(),
      name: activity.name,
      duration: activity.duration_minutes,
      cph: activity.calories_per_hour,
      burned: activity.total_calories,
    };

    const postData = await axiosPrivate.post(`/caloriesburned/newActivity`, {
      activityId: uniqid(),
      name: activity.name,
      duration: activity.duration_minutes,
      cph: activity.calories_per_hour,
      burned: activity.total_calories,
    });
    console.log(postData.data);
    console.log(activityObject);
    dispatch(createActivitySuccess(activityObject));
  } catch (e) {
    console.log(e);
    dispatch(createActivityFailure);
  }
};

export const DeleteActivity = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteActivityStart);

  try {
    await axiosPrivate.put(`/caloriesburned/${id}`, {});

    dispatch(deleteActivitySuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteActivityFailure);
  }
};
