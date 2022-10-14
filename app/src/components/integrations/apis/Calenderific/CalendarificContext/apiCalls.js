import axios from "axios";

import {
  getHolidayStart,
  getHolidayFailure,
  getHolidaySuccess,
  createHolidayStart,
  createHolidaySuccess,
  createHolidayFailure,
} from "./listActions";
export const GetHolidays = async (axiosPrivate, dispatch) => {
  dispatch(getHolidayStart);
  try {
    const response = await axiosPrivate.get(`/calendarific/holiday`);

    dispatch(getHolidaySuccess(response.data.data.holidays));
    console.log(response.data.data.holidays);
  } catch (e) {
    dispatch(getHolidayFailure);
  }
};
export const CreateHoliday = async (countryCode, axiosPrivate, dispatch) => {
  dispatch(createHolidayStart);
  console.log(countryCode);
  try {
    await axiosPrivate.post(`/calendarific/country`, {
      country: countryCode,
    });
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Calendarific",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const response = await axios.get(
      `https://calendarific.com/api/v2/holidays?country=${countryCode}&year=${currentYear}&api_key=${apiKey}&month=${currentMonth}`
    );
    const holidays = response.data.response.holidays;
    console.log(holidays);
    holidays.map(async (holiday) => {
      const holidayObject = {
        country: countryCode,
        month: currentMonth,
        year: currentYear,
        name: holiday.name,
        description: holiday.description,
        date: holiday.date.iso.substring(0, 10),
      };

      const postData = await axiosPrivate.post(`/calendarific/newholiday`, {
        country: countryCode,
        month: currentMonth,
        year: currentYear,
        name: holiday.name,
        description: holiday.description,
        date: holiday.date.iso.substring(0, 10),
      });
      console.log(postData.data);
      console.log(holidayObject);
      dispatch(createHolidaySuccess(holidayObject));
    });
  } catch (e) {
    console.log(e);
    dispatch(createHolidayFailure);
  }
};

//};
