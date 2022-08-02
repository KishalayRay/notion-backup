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
export const getBooks = async (dispatch) => {
  dispatch(getGooglebookStart);
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/omdb/omdbs`,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );

    dispatch(getGooglebookSuccess(response.data.data.Omdb));
    console.log(response.data.data.Omdb);
  } catch (e) {
    dispatch(getGooglebookFailure);
  }
};
export const createBook = async (movieId, dispatch) => {
  dispatch(createGooglebookStart);
  console.log(movieId);
  try {
    const res = await axios.post(
      `http://localhost:8000/api/v1/apiconfig/key`,
      { apiSlug: "Omdb" },
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
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
    );
    const movie = response.data;
    console.log(movie);
    const movieObject = {
      movieId: movie.imdbID,
      movieTitle: movie.Title,
      movieImage: movie.Poster,
      movieGenre: movie.Genre,
      movieDuration: movie.Runtime,
      movieRating: movie.imdbRating,
      movieYear: movie.Year,
    };

    const postData = await axios.post(
      `http://localhost:8000/api/v1/omdb/newomdb`,
      {
        movieId: movie.imdbID,
        movieTitle: movie.Title,
        movieImage: movie.Poster,
        movieGenre: movie.Genre,
        movieDuration: movie.Runtime,
        movieRating: movie.imdbRating,
        movieYear: movie.Year,
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
    console.log(movieObject);
    dispatch(createGooglebookSuccess(movieObject));
  } catch (e) {
    console.log(e);
    dispatch(createGooglebookFailure);
  }
};

export const deleteBook = async (id, dispatch) => {
  dispatch(deleteGooglebookStart);

  try {
    await axios.put(
      `http://localhost:8000/api/v1/omdb/${id}`,
      {},
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );

    dispatch(deleteGooglebookSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteGooglebookFailure);
  }
};
