/* eslint-disable no-unused-vars */
import http from "../http";

const trackApplication = async (    loan_id) => {
  try {
    return await http.get(`/loan/find/${loan_id}`);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

export default {
  trackApplication,
};
