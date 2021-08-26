/* eslint-disable import/no-anonymous-default-export */
import { LOGIN, FIND_ALL_USERS, INVITE_USER } from "../actionTypes";

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload };
    case FIND_ALL_USERS:
      return { ...state, allUsers: payload };
    case INVITE_USER:
      return { ...state, invitedUser: payload };
    default:
      return state;
  }
};
