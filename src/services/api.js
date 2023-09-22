import axios from 'axios';

const API_KEY = 'dc959e98811f823bbb3ceab9e0f5d7bd';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const params = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
};

export const fetchAllMovies = async () => {
  const { data } = await axios.get(`/trending/movie/day`, params);
  // console.log(data.results);
  return data.results;
};

export const fetchMovieById = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}`, params);
  // console.log(data);

  return data;
};

// fetchMovieById(565770); //!!!!

export const fetchMovieBySearch = async query => {
  const { data } = await axios.get(`/search/movie?query=${query}`, params);
  // console.log(data.results);
  return data.results;
};

// fetchMovieBySearch('barbie');

export const fetchMovieCast = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, params);
  // console.log(data);
  return data;
};

// fetchMovieCast(565770);

export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`, params);
  // console.log(data);
  return data;
};

// fetchMovieReviews(565770);
// // 565770
