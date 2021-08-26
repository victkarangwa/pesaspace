/* eslint-disable import/no-anonymous-default-export */
import {
  TRACK_LOAN_APPLICATION,
  FIND_ALL_REQUESTS,
  ACCEPT_REJECT_REQUEST,
  FIND_NIDA_INFO,
  APPLY_LOAN,
} from "../actionTypes";

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRACK_LOAN_APPLICATION:
      return { ...state, ...payload };

    case FIND_ALL_REQUESTS:
      return { ...state, allRequests: payload };

    case ACCEPT_REJECT_REQUEST:
      return { ...state, actionedRequest: payload };

    case FIND_NIDA_INFO:
      return { ...state, nidaInfo: payload };

    case APPLY_LOAN:
      return { ...state, loanApplication: payload };

    default:
      return state;
  }
};
