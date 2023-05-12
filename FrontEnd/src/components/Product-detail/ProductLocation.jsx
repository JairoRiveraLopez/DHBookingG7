import React from 'react'
import "../styles/product-detail/product-location.css";
import PinIcon from '../../resources/gps.svg';
import useWindowSize from '../../utils/useWindowSize';

const ProductLocation = ({ state, city, country, distance }) => {
  let { width } = useWindowSize();

  return (
    <div className='product-location-container'>
      <img className='pin-icon' src={PinIcon} alt="Pin Icon" />
      <div className='product-location'>
        <span>{state}, </span>
        <span>{city}, </span>
        <span>{country}. </span>
        {
          width > 768
            ? <div>A {distance} m del centro.</div>
            : ''
        }
      </div>
    </div>
  )
}

export default ProductLocation;
