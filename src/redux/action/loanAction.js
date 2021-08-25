import store from "store";
import { TRACK_LOAN_APPLICATION, LOADING_USER } from "redux/actionTypes";
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
