import React from 'react'
import "../styles/product-detail/product-description.css";

const ProductDescription = ({ title, description }) => {
  return (
    <div className='content-description'>
      <h1>
        {title}
      </h1>
      <p>
        {description}
      </p>
    </div>
  );
}


export default ProductDescription;