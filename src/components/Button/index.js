import React from "react";
import { Button } from "antd";
import "./style.scss";

const Btn = ({
  curved,
  children,
  onClick,
  style,
  className,
  loading,
  htmlType,
  disabled,
}) => {
  return (
    <Button
      className={`${curved && "curved"} rounded custom-btn ${className}`}
      style={style}
      onClick={onClick}
      size="large"
      loading={loading}
      htmlType={htmlType}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
export default Btn;
