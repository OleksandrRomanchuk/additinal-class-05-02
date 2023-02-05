import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const KEY = '9cca312caffd11f4ae9f11244d585025';

axios.defaults.baseURL = URL;

export const getMovies = async page => {
  const response = await axios(`trending/movie/day`, {
    params: {
      page,
      api_key: KEY,
    },
  });

  return response.data.results;
};
