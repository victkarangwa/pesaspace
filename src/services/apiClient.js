/* eslint-disable no-unused-vars */
import { notification } from "antd";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const resolve = (response) => {
  const { data } = response;
  return { ...response, data: undefined, body: data };
};

const reject = (error) => {
  const { data } = error.response || {};
  const message = data?.error[0] || error.message;
  if (data.status === 401) {
    // localStorage.removeItem("tpj-token");
    return;
  }
  if (data.status === 500) {
    notification.error({
      message: `Server error`,
      description: "Something went wrong please try again later!",
    });
  }
  return error;
};

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL:  process.env.NODE_ENV !== "development"
  ? process.env.REACT_APP_PROD_URL
  : process.env.REACT_APP_DEV_URL,
  headers: {
    "Content-Type": "application/json",
    // authorization: `${localStorage.getItem("tpj-token")}`,
  },
  timeout: 10000,
  responseType: "json",
  validateStatus: (status) => status < 400,
});

instance.interceptors.response.use(resolve, reject);

export default instance;
