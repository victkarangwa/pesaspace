import store from "store";
import { LOGIN, LOADING_USER, FIND_ALL_USERS } from "redux/actionTypes";
import { notification } from "antd";
import authService from "services/auth";
import { decoder as tokenDecoder } from "utils/tokenDecoder";

export const loginAction = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await authService.login(payload);
    if (status === 200) {
      dispatch({
        type: LOGIN,
        payload: { data: body.data, status: "success" },
      });
      store.set("pp-token", body.data.token);
      tokenDecoder().role === "admin"
        ? window.location.replace("/admin/users")
        : window.location.replace("/dashboard");
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    notification.error({
      message: "Error",
      description: "Incorrect email or password",
    });
    dispatch({
      type: LOGIN,
      payload: {
        data: "Unable to login",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};

export const findAllUsersAction = (payload) => async (dispatch) => {
  dispatch({ type: LOADING_USER, payload: { loading: true } });
  try {
    const { status, body } = await authService.getAllUsers(payload);
    if (status === 200) {
      dispatch({
        type: FIND_ALL_USERS,
        payload: { data: body.data, status: "success" },
      });
    }
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  } catch (error) {
    notification.error({
      message: "Error",
      description: "Incorrect email or password",
    });
    dispatch({
      type: FIND_ALL_USERS,
      payload: {
        data: "Unable to login",
        status: "fail",
      },
    });
    dispatch({ type: LOADING_USER, payload: { loading: false } });
  }
};
