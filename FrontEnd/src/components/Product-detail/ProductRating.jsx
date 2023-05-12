import React from 'react';
import "../styles/product-detail/product-rating.css";
import StarIcon from "../../resources/star.svg";

const ProductRating = (props) => {
  //let rating = Math.min(Math.max(props.rating, 1), 5); //clamp value
  let stars = Math.floor(props.rating/2); //clamp value
  
  const wordsRating = ['Muy malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente'];
  //const dobleRating = rating * 2;
  return (
    <div className='product-rating-container'>
      <div>
        <div className='word-rating'>
          {wordsRating[stars - 1]}
        </div>
        <div>
          {
            Array(5).fill('').map(
              (_, i) => {
                return <img key={`star-${i}`} src={StarIcon} className={stars > i ? '' : 'disable'} alt="star icon" />
              }
            )
          }
        </div>
      </div>
      <div className='big-number'>
        <span>{props.rating}</span>
      </div>
    </div>
  )
}

export default ProductRating;
