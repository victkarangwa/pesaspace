/* eslint-disable no-unused-vars */
import http from "../http";

const myWallet = async (payload) => {
  try {
    return await http.get("/wallet/my");
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const totalRevenue = async (payload) => {
  try {
    return await http.get("/wallet/revenue");
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

export default {
  myWallet,
  totalRevenue,
};
