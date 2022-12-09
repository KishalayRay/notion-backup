import axios from "axios";

import cryptoJS from "crypto-js";

import {
  getGooglebookStart,
  getGooglebookFailure,
  getGooglebookSuccess,
  deleteGooglebookStart,
  deleteGooglebookFailure,
  deleteGooglebookSuccess,
  createGooglebookStart,
  createGooglebookSuccess,
  createGooglebookFailure,
} from "./listActions";
export const GetBooks = async (axiosPrivate, dispatch) => {
  dispatch(getGooglebookStart);
  try {
    const response = await axiosPrivate.get(`/googlebooks/books`);

    dispatch(getGooglebookSuccess(response.data.data.book));
    console.log(response.data.data.book);
  } catch (e) {
    dispatch(getGooglebookFailure);
  }
};
export const CreateBook = async (bookId, axiosPrivate, dispatch) => {
  dispatch(createGooglebookStart);
  console.log(bookId);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Googlebooks",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`
    );
    const book = response.data;
    console.log(book);
    const bookObject = {
      bookId: book.id,
      bookTitle: book.volumeInfo.title,
      bookSubtitle: book.volumeInfo.subtitle,
      bookCover: book.volumeInfo.imageLinks.smallThumbnail,
      bookCategory: book.volumeInfo.categories[0].split(/[&/]+/),
      bookAuthor: book.volumeInfo.authors[0],
      bookDescription: book.volumeInfo.description,
      bookPage: book.volumeInfo.pageCount,
    };

    const postData = await axiosPrivate.post(`/googlebooks/newbook`, {
      bookId: book.id,
      bookTitle: book.volumeInfo.title,
      bookSubtitle: book.volumeInfo.subtitle,
      bookCover: book.volumeInfo.imageLinks.smallThumbnail,
      bookCategory: book.volumeInfo.categories[0].split(/[&/]+/),
      bookAuthor: book.volumeInfo.authors[0],
      bookDescription: book.volumeInfo.description,
      bookPage: book.volumeInfo.pageCount,
    });
    console.log(postData.data);
    console.log(bookObject);
    dispatch(createGooglebookSuccess(bookObject));
  } catch (e) {
    console.log(e);
    dispatch(createGooglebookFailure);
  }
};

export const DeleteBook = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteGooglebookStart);

  try {
    await axiosPrivate.put(`/googlebooks/${id}`, {});

    dispatch(deleteGooglebookSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteGooglebookFailure);
  }
};
