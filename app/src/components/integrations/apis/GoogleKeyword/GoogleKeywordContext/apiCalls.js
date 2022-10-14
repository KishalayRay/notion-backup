import axios from "axios";

import {
  getKeywordStart,
  getKeywordFailure,
  getKeywordSuccess,
  createKeywordStart,
  createKeywordSuccess,
  createKeywordFailure,
} from "./listActions";
export const GetKeywords = async (axiosPrivate, dispatch) => {
  dispatch(getKeywordStart);
  try {
    const response = await axiosPrivate.get(`/googlekeyword/keywords`);

    dispatch(getKeywordSuccess(response.data.data.keywords));
    console.log(response.data.data.keywords);
  } catch (e) {
    dispatch(getKeywordFailure);
  }
};
export const CreateKeyword = async (query, axiosPrivate, dispatch) => {
  dispatch(createKeywordStart);
  console.log(query);
  //const uule = createUule(location);
  try {
    const currDate = new Date().toISOString();
    const keywordObject = {
      keyword: query,
      date: currDate,
    };

    const postData = await axiosPrivate.post(`/googlekeyword/newkeyword`, {
      keyword: query,
    });
    console.log(postData.data);
    console.log(keywordObject);
    dispatch(createKeywordSuccess(keywordObject));
  } catch (e) {
    console.log(e);
    dispatch(createKeywordFailure);
  }
};
