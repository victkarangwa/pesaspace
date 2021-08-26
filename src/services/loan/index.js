/* eslint-disable no-unused-vars */
import http from "../http";

const trackApplication = async (loan_id) => {
  try {
    return await http.get(`/loan/find/${loan_id}`);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const findAllRequests = async (loan_id) => {
  try {
    return await http.get(`/loan/all`);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const acceptOrRejectRequest = async (loan_id, action, reason) => {
  try {
    return await http.patch(`/loan/${loan_id}/${action}`, { reason });
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const findNidaInfo = async (nid) => {
  try {
    return await http.get(`/loan/nida/${nid}`);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

const applyForLoan = async (payload) => {
  try {
    return await http.post(`/loan/apply`, payload);
  } catch (error) {
    console.log("API ERROR: ", error);
  }
};

export default {
  trackApplication,
  findAllRequests,
  acceptOrRejectRequest,
  findNidaInfo,
  applyForLoan,
};
