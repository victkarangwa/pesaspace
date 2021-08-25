import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo_dark from "assets/images/logo_dark.png";
import Button from "components/Button";
import {loginAction} from "redux/action/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const {
    core: { loading },
  } = useSelector(({ core }) => ({ core }));

  const handleLogin = (loginFields) => {
    loginAction(loginFields)(dispatch);
  };
  return (
    <div className="  d-flex flex-row justify-content-center container">
      <div className="w-50  mt-5">
        <div className="logo text-center">
          <img alt="logo" src={logo_dark} />
        </div>
        <div className="card user-form p-3 mt-5">
          <Helmet title="Login" />
          <div className="text-dark font-size-24 mb-3  text-center">
            <h5>Sign in to your account</h5>
          </div>
          <Form layout="vertical" hideRequiredMark onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please provide your email address",
                },
                {
                  type: "email",
                  message: "Please provide valid email address",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please provide your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="Password"
              />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="text-center w-100 mt-3"
              htmlType="submit"
              loading={loading}
            >
              <strong>{loading ? "Authenticating..." : "Sign in"}</strong>
            </Button>

          </Form>
          <Link to="/forgot-password" className="link mt-2 font-size-16">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
