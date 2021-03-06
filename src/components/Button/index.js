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
  danger,
}) => {
  return (
    <Button
      className={`${curved && "curved"} rounded custom-btn ${className} ${danger && "danger"}`}
      style={style}
      onClick={onClick}
      size="large"
      loading={loading}
      htmlType={htmlType}
      disabled={disabled}
      type="primary"
    >
      {children}
    </Button>
  );
};
export default Btn;
