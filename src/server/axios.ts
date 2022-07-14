import axios from "axios";

const BASE_URL = process.env.TMDB_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

export default instance;
