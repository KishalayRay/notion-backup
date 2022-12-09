import axios from "axios";

import {
  getNewsStart,
  getNewsFailure,
  getNewsSuccess,
  createNewsStart,
  createNewsSuccess,
  createNewsFailure,
} from "./listActions";
export const GetNews = async (axiosPrivate, dispatch) => {
  dispatch(getNewsStart);
  try {
    const response = await axiosPrivate.get(`/thenewsapi/news`);

    dispatch(getNewsSuccess(response.data.data.news));
    console.log(response.data.data.news);
  } catch (e) {
    dispatch(getNewsFailure);
  }
};
export const CreateNews = async (countryCode, axiosPrivate, dispatch) => {
  dispatch(createNewsStart);
  console.log(countryCode);
  try {
    await axiosPrivate.post(`/thenewsapi/country`, {
      country: countryCode,
    });
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Thenewsapi",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${countryCode}`
    );
    const news = response.data.results;
    console.log(news);
    news.map(async (bulletin) => {
      const newsObject = {
        country: countryCode,
        title: bulletin.title,
        snippet: bulletin.description,
        time: bulletin.pubDate,
        url: bulletin.link,
      };

      const postData = await axiosPrivate.post(`/thenewsapi/newnews`, {
        country: countryCode,
        title: bulletin.title,
        snippet: bulletin.description,
        time: bulletin.pubDate,
        url: bulletin.link,
      });
      console.log(postData.data);
      console.log(newsObject);
      dispatch(createNewsSuccess(newsObject));
    });
  } catch (e) {
    console.log(e);
    dispatch(createNewsFailure);
  }
};
