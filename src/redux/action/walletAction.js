import store from "store";
import {
  GET_USER_WALLET,
  GET_TOTAL_WALLET,
  LOADING_USER,
  DEPOSIT_MONEY,
} from "redux/actionTypes";
import { notification } from "antd";
import walletService from "services/wallet";

export const findWalletData = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await walletService.myWallet(payload);
    if (status === 200) {
      dispatch({
        type: GET_USER_WALLET,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: GET_USER_WALLET,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const findTotalWallet = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await walletService.totalRevenue(payload);
    if (status === 200) {
      dispatch({
        type: GET_TOTAL_WALLET,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_WALLET,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const depositMoney = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await walletService.deposit(payload);
    if (status === 200) {
      notification.success({
        message: "Success",
        description: "Money deposited successfully!",
      });
      dispatch({
        type: DEPOSIT_MONEY,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: DEPOSIT_MONEY,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};
