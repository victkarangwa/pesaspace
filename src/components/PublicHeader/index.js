import React from "react";
import "./style.scss";
import { TwitterOutlined } from "@ant-design/icons";
import Button from "components/Button";
import Logo from "assets/images/logo_dark.png";
import { useHistory } from "react-router-dom";

const MainHeader = () => {
  const history = useHistory();
  return (
    <div className="nav-sections">
      <div className="logo-section">
        <img src={Logo} className="logo" alt="logo" />
        <div className="logo-txt">
          <label className="logo-name-1">Pesa Space</label>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-around">
        <span className="nav-link__item">
          <Button
            onClick={() => history.push("/loan/apply")}
            icon={<TwitterOutlined />}
            link
          >
            Apply For Loan
          </Button>
        </span>
      </div>
    </div>
  );
};

export default MainHeader;
