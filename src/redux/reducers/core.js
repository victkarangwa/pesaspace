/* eslint-disable import/no-anonymous-default-export */
import {
  LOADING_USER
} from "../actionTypes";

export const initialState = {
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // Common states
    case LOADING_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};
