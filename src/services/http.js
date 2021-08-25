/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { notification } from "antd";
import axios from "axios";
import store from "store";
import dotenv from "dotenv";

dotenv.config();

const resolve = (response) => {
  const { data } = response;
  return { ...response, data: undefined, body: data };
};

const reject = (error) => {
  const { data, status } = error.response || {};
  const message = data.message || error.message;
  const errorMessage = data.errors || error.errors;

  notification.error({
    message: message,
    description: errorMessage[0]? errorMessage[0].message : "",
  });
  return error;
};

const instance = axios.create({
  // eslint-disable-next-line no-undef
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL:
    process.env.NODE_ENV !== "development"
      ? process.env.REACT_APP_PRO_URL
      : process.env.REACT_APP_DEV_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: "",
  },
  timeout: 20000,
  responseType: "json",
  validateStatus: (status) => status < 400,
});

instance.interceptors.response.use(resolve, reject);

export default instance;
