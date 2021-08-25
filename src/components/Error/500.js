/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Helmet from "react-helmet";
import { Button } from "antd";
import { CloudServerOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Error500 = ({ error, resetErrorBoundary }) => {
  // const history = useHistory();
  return (
    <>
      <Helmet title="Server error" />
      <div className="container pl-5 pr-5  pb-5 mb-auto text-dark font-size-32">
        <div style={{ fontSize: "200px" }}>
          <CloudServerOutlined />
        </div>
        <>
          <div className="font-weight-bold mb-3">
            OOOPS, something went wrong:
            {process.env.NODE_ENV === "development" ? (
              <pre>{error.message} </pre>
            ) : (
              ""
            )}
          </div>
          <div className="text-gray-6 font-size-24">
            Server error. We apologize and are fixing the problem. <br />
            Please try again at a later stage.
          </div>
          <div className="font-weight-bold font-size-70 mb-1">500 —</div>
          <Button
            onClick={() => window.location.replace("/")}
            className="btn btn-outline-primary width-100"
          >
            Try again
          </Button>
        </>
      </div>
    </>
  );
};

export default Error500;
