import store from "store";
import {
  TRACK_LOAN_APPLICATION,
  FIND_ALL_REQUESTS,
  LOADING_USER,
  ACCEPT_REJECT_REQUEST,
} from "redux/actionTypes";
import loanService from "services/loan";

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

export const acceptOrRejectRequest = (loan_id, action, reason) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await loanService.acceptOrRejectRequest(
      loan_id,
      action, reason
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
