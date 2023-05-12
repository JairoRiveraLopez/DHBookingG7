import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "../../resources/back.svg";
import "../styles/product-detail/product-header.css";

const ProductHeader = () => {
  return (
    <div className="product-header-container">
      <div>
        <div>
          <h2 className="product-name"> Administración</h2>
        </div>
        <div className="back-container">
          <Link to="/">
            <button className="back-btn">
              <img className="" src={BackIcon} alt="back to home" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
