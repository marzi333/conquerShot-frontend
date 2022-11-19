import axios from "axios";

import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});
const instanceImg = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    },
  },
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosRetry(instance, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

const api = () => {
  return instance;
};
const apiImg = () => {
  return instanceImg;
};

export { api, apiImg };
