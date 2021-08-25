import React, { useState, useEffect } from "react";
import { Input, Badge } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import store from "store";
import Logo from "assets/images/logo.png";
import "./style.scss";

const AppHeader = ({
  setOpenMenu,
  cartItems,
  searchItems,
  setSearchResults,
}) => {
  const [cartData, setCartData] = useState([]);

  const location = useLocation();

  useEffect(() => {}, []);

  const handleChange = (value) => {
    if (value) {
      const filtered = searchItems.filter((item) =>
        item.Name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults && setSearchResults(filtered);
    } else {
      setSearchResults && setSearchResults(searchItems);
    }
  };

  const openMenu = () => setOpenMenu(true);

  return (
    <div className="main-header bg-white py-3">
      <div className=" w-100 d-flex flex-row justify-content-space-between mx-5">
        <Input
          className="w-50 text-left rounded border-light bg-light"
          placeholder="search loan data"
          prefix={<SearchOutlined />}
        />

        <div className="w-50 profile-info px-5 d-flex flex-row">
          <div>
            <img alt="logo" />
          </div>
          <div className="d-flex flex-column">
            <span className="text-right">John Doe</span>
            <span className="text-right">Shareholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  setOpenMenu: PropTypes.func,
  cartItems: PropTypes.array,
  searchItems: PropTypes.array,
  setSearchResults: PropTypes.func,
};

export default AppHeader;
