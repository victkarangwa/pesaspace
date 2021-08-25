/* eslint-disable import/no-anonymous-default-export */
import {
    TRACK_LOAN_APPLICATION
  } from "../actionTypes";
  
  export const initialState = {

  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case TRACK_LOAN_APPLICATION:
        return { ...state, ...payload };
      default:
        return state;
    }
  };
  