import _axios from 'axios';

_axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const instance = _axios.create({
  baseUrl: `https://api.themoviedb.org/3`,
  timeout: 1000,
});

export default instance;