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
      `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${countryCode}`
    );
    const news = response.data.data;
    console.log(news);
    news.map(async (bulletin) => {
      const newsObject = {
        country: bulletin.locale,
        title: bulletin.title,
        snippet: bulletin.snippet,
        time: new Date(bulletin.published_at),
        url: bulletin.url,
      };

      const postData = await axiosPrivate.post(`/thenewsapi/newnews`, {
        country: bulletin.locale,
        title: bulletin.title,
        snippet: bulletin.snippet,
        time: bulletin.published_at,
        url: bulletin.url,
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
