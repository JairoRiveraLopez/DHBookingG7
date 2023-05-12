import React,{useState} from 'react'
import StarIcon from '../../resources/star.svg'
import gps from '../../resources/gps.svg'
import  '../styles/booking/detail-booking.css'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../hooks/axiosBase'
import axios from 'axios'

const DetailBooking = ({
  rating,
  img,
  category,
  title,
  address,
  checkin ,
  checkout,
  dataBooking,
  token,
  resetBooking
}) => {
  const navigate = useNavigate();
  let stars = Math.floor(rating / 2); //clamp value
  const wordsRating = [
    "Muy malo",
    "Regular",
    "Bueno",
    "Muy Bueno",
    "Excelente",
  ];
  const [error, setError] = useState("");
  console.log(error)
  const confirmBooking = () => {
    try {
      let urlPost = baseURL + "bookings";
      axios
        .post(urlPost, dataBooking, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resetBooking();
          navigate(`/successful-booking`);
        })
        .catch((e) => setError(e));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-detail">
      <h2>Detalle de la reserva</h2>
      <img src={img} alt="img product" id="product-img" />
      <div className="content-info-detail">
        <div className="category-info">
          <span>{category.toUpperCase()}</span>
          <h2>{title}</h2>
          <div>
            {Array(5)
              .fill("")
              .map((_, i) => {
                return (
                  <img
                    key={`star-${i}`}
                    src={StarIcon}
                    className={stars > i ? "" : "disable"}
                    alt="star icon"
                  />
                );
              })}
          </div>
        </div>
        <div className="ubication">
          <img src={gps} alt="icon ubication" />
          <p>{address}</p>
        </div>
        <div className="check-in">
          <h4>Check in</h4>
          <p>{!checkin ? "___/___/____" : checkin}</p>
        </div>
        <div className="check-in">
          <h4>Check out</h4>
          <p>{!checkout ? "___/___/____" : checkout}</p>
        </div>
        {error && (
          <div className="div-error">
            {!!error && (
              <span className="error">
                { error.response.status === 500 ? "Por favor seleccionar hora de llegada" : "Fechas no disponibles, por favor cambiar"}
              </span>
            )}
          </div>
        )}
        <button
          disabled={!checkin || !checkout ? true : false}
          onClick={confirmBooking}
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default DetailBooking;