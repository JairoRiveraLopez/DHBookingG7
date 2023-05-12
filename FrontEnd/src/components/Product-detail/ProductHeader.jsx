import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "../../resources/back.svg";
import HeartLineIcon from "../../resources/heart-line.svg";
import HeartIcon from "../../resources/heart.svg";
import ShareIcon from "../../resources/share.svg";
import ProductLocation from "./ProductLocation";
import ProductRating from "./ProductRating";
import "../styles/product-detail/product-header.css";

const ProductHeader = ({ category, name, location, distance, rating ,pLocation = true}) => {
  return (
    <div className="product-header-container">
      <div>
        <div>
          <h4 className="product-category">{category.toUpperCase()}</h4>
          <h2 className="product-name"> {name}</h2>
        </div>
        <div className="back-container">
          <Link to="/">
            <button className="back-btn">
              <img className="" src={BackIcon} alt="back to home" />
            </button>
          </Link>
        </div>
      </div>
      {pLocation  && (
        <>
          <div>
            <ProductLocation
              country={location.country}
              state={location.state}
              city={location.name}
              distance={distance}
            />
            <ProductRating rating={rating} />
          </div>
          <div>
            <button className="back-btn">
              <img src={ShareIcon} alt="share" />
            </button>
            <button className="back-btn">
              <img src={HeartLineIcon} alt="like" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductHeader;
