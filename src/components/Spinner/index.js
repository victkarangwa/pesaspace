import React from "react";
import { Spin } from "antd";
import "./style.scss";

const Spinner = () => {
  return (
    <div className="custom-spin">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
