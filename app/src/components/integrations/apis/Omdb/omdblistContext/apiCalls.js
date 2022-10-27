import axios from "axios";
import cryptoJS from "crypto-js";

import {
  getOmdbStart,
  getOmdbFailure,
  getOmdbSuccess,
  deleteOmdbStart,
  deleteOmdbFailure,
  deleteOmdbSuccess,
  createOmdbStart,
  createOmdbSuccess,
  createOmdbFailure,
} from "./listActions";
export const GetMovies = async (axiosPrivate, dispatch, pageId) => {
  dispatch(getOmdbStart);
  try {
    const response = await axiosPrivate.get(`/omdb/omdbs?page=${pageId}`);

    dispatch(
      getOmdbSuccess(response.data.data.Omdb, response.data.data.pageCount)
    );
    console.log(response.data.data.Omdb);
  } catch (e) {
    dispatch(getOmdbFailure);
  }
};
export const CreateMovie = async (movieId, axiosPrivate, dispatch) => {
  dispatch(createOmdbStart);
  console.log(movieId);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, { apiSlug: "Omdb" });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
    );
    const movie = response.data;
    console.log(movie);
    const movieObject = {
      movieId: movie.imdbID,
      movieTitle: movie.Title,
      movieImage: movie.Poster,
      movieGenre: movie.Genre.split(",")[0],
      movieDuration: parseFloat(movie.Runtime) || 0,
      movieRating: parseFloat(movie.imdbRating) || 0,
      movieYear: parseFloat(movie.Year) || 0,
    };

    const postData = await axiosPrivate.post(`/omdb/newomdb`, {
      movieId: movie.imdbID,
      movieTitle: movie.Title,
      movieImage: movie.Poster,
      movieGenre: movie.Genre.split(",")[0],
      movieDuration: parseFloat(movie.Runtime) || 0,
      movieRating: parseFloat(movie.imdbRating) || 0,
      movieYear: parseFloat(movie.Year) || 0,
    });
    console.log(postData.data);
    console.log(movieObject);
    dispatch(createOmdbSuccess(movieObject));
  } catch (e) {
    console.log(e);
    dispatch(createOmdbFailure);
  }
};
// const response = await axios.get(`${API}&i=${movieId}`);
//   const movie = response.data;
//   console.log(movie);
//   const movieObject = {
//     movieId: movie.imdbID,
//     movieTitle: movie.Title,
//     movieImage: movie.Poster,
//     movieGenre: movie.Genre,
//     movieDuration: movie.Runtime,
//     movieRating: movie.imdbRating,
//     movieYear: movie.Year,
//   };

// axios.post(
//   `/omdb/newomdb`,
//   {
//     movieId: movie.imdbID,
//     movieTitle: movie.Title,
//     movieImage: movie.Poster,
//     movieGenre: movie.Genre,
//     movieDuration: movie.Runtime,
//     movieRating: movie.imdbRating,
//     movieYear: movie.Year,
//   },
//   {
//     headers: {
//       token: `Bearer ${
//         JSON.parse(localStorage.getItem("user")).accessToken
//       }`,
//     },
//   }
// );
// console.log("success post");
export const DeleteMovie = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteOmdbStart);

  try {
    await axiosPrivate.put(`/omdb/${id}`, {});

    dispatch(deleteOmdbSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteOmdbFailure);
  }
};
