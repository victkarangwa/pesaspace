/* eslint-disable import/no-anonymous-default-export */
import { GET_USER_WALLET, GET_TOTAL_WALLET, DEPOSIT_MONEY } from "../actionTypes";

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_WALLET:
      return { ...state, myWallet:payload };
    case GET_TOTAL_WALLET:
      return { ...state, revenue:payload };
      case DEPOSIT_MONEY:
        return { ...state, deposit:payload };
    default:
      return state;
  }
};
