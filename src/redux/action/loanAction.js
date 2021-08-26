import store from "store";
import {
  TRACK_LOAN_APPLICATION,
  FIND_ALL_REQUESTS,
  LOADING_USER,
  ACCEPT_REJECT_REQUEST,
  FIND_NIDA_INFO,
  APPLY_LOAN,
} from "redux/actionTypes";
import loanService from "services/loan";
import { notification } from "antd";

export const trackLoanApplication = (loan_id) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await loanService.trackApplication(loan_id);
    if (status === 200) {
      dispatch({
        type: TRACK_LOAN_APPLICATION,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: TRACK_LOAN_APPLICATION,
      payload: {
        data: "ID not found",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const findAllRequests = () => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await loanService.findAllRequests();
    if (status === 200) {
      dispatch({
        type: FIND_ALL_REQUESTS,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: FIND_ALL_REQUESTS,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const acceptOrRejectRequest =
  (loan_id, action, reason) => async (dispatch) => {
    dispatch({ type: LOADING_USER, payload: { loading: true } });
    try {
      const { status, body } = await loanService.acceptOrRejectRequest(
        loan_id,
        action,
        reason
      );
      if (status === 200) {
        dispatch({
          type: ACCEPT_REJECT_REQUEST,
          payload: { data: body.data, status: "success" },
        });
      }
      dispatch({ type: LOADING_USER, payload: { loading: false } });
    } catch (error) {
      dispatch({
        type: ACCEPT_REJECT_REQUEST,
        payload: {
          data: "Request failed",
          status: "fail",
        },
      });
      dispatch({ type: LOADING_USER, payload: { loading: false } });
    }
  };

export const findNidaInfo = (nid) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await loanService.findNidaInfo(nid);
    if (status === 200) {
      dispatch({
        type: FIND_NIDA_INFO,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: FIND_NIDA_INFO,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const applyForAny = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await loanService.applyForLoan(payload);
    if (status === 202) {
      notification.success({
        message: "Success",
        description: "Your request has been submitted",
      });
      dispatch({
        type: APPLY_LOAN,
        payload: { data: body.data, status: "success" },
      });
    }else{
      console.log("-----------");
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    notification.error({
      message: "Error",
      description: "Unable to process your request",
    });
    dispatch({
      type: APPLY_LOAN,
      payload: {
        data: "Request failed",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};
