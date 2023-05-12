import React, {useState,useEffect} from "react";
import SearchCalendar from "../SearchCalendar";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/product-detail/product-reservation.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import DatesProvider from "../../context/BookingContext";
import { getBookingsByProductId } from "../../utils/bookings";
import { SkeletonCalendar } from "../Skeleton";

const ProductReservation = ({ product }) => {
  const { auth } = useContext(AuthContext);
  const { range, setRange } = useContext(DatesProvider);
  const [forbiddenDates, setForbiddenDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [forbiddenDatesFormat, setForbiddenDatesFormat] = useState([]);
 
 useEffect(() => {
   const forbidden = [];
   if (isLoadingDates) {
     getBookingsByProductId(product.idProduct).then((res) => {
       setForbiddenDates(res.data);
       setIsLoadingDates(false);
     });
   } else {
     forbiddenDates.map((item) =>
       forbidden.push(
         new Date(new Date(item).setDate(new Date(item).getDate() + 1))
       )
     );

     setForbiddenDatesFormat(forbidden);
   }
 }, [product.idProduct, isLoadingDates]);
 
  const navigate = useNavigate();
  const params = useParams();

 
  const bookingRedirection = () => {
    auth
      ? navigate(`/product-detail/${params.productId}/bookings`, {
          state: { ...product, forbiddenDatesFormat },
        })
      : navigate("/login?error=" + params.productId, {
          state: { ...product, forbiddenDatesFormat },
        });
  };

  return (
    <div className="reservation">
      <div className="reservation-header">
        <h1>Fechas Disponibles</h1>
      </div>
      <div className="reservation-body">
        {
          !isLoadingDates ?
        <SearchCalendar forbiddenDates={forbiddenDatesFormat} />
        : <SkeletonCalendar/>
        }
        <div className="reservation-step">
          <p>Agregá tus fechas de viaje para obtener precios exactos</p>
          <button onClick={bookingRedirection}>Iniciar reserva</button>
        </div>
      </div>
    </div>
  );
};

export default ProductReservation;
