import axios from "axios";
import cryptoJS from "crypto-js";

import {
  getHolidayStart,
  getHolidayFailure,
  getHolidaySuccess,
  createHolidayStart,
  createHolidaySuccess,
  createHolidayFailure,
} from "./listActions";
export const getHolidays = async (dispatch) => {
  dispatch(getHolidayStart);
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/calendarific/holiday`,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );

    dispatch(getHolidaySuccess(response.data.data.holidays));
    console.log(response.data.data.holidays);
  } catch (e) {
    dispatch(getHolidayFailure);
  }
};
export const createHoliday = async (countryCode, dispatch) => {
  dispatch(createHolidayStart);
  console.log(countryCode);
  try {
    await axios.post(
      `http://localhost:8000/api/v1/calendarific/country`,
      {
        country: countryCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    const res = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Calendarific" },
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    const hashedData = res.data.data.ApiKey.keys[0].key;
    console.log(hashedData);
    const apiKey = cryptoJS.AES.decrypt(
      hashedData,
      "3DNFRo2no81p8KUEIN47B%$^&6c4876"
    ).toString(cryptoJS.enc.Utf8);
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
        date: holiday.date.iso,
      };

      const postData = await axios.post(
        `http://localhost:8000/api/v1/calendarific/newholiday`,
        {
          country: countryCode,
          month: currentMonth,
          year: currentYear,
          name: holiday.name,
          description: holiday.description,
          date: holiday.date.iso,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        }
      );
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
