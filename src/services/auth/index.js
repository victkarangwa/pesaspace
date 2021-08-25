/* eslint-disable no-unused-vars */
import http from "../http";

const login = async (payload) => {
  try {
    return await http.post("/auth/login", payload);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const getAllUsers = async (payload) => {
  try {
    return await http.get("/auth/users", payload);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

export default {
  login,
  getAllUsers
};
