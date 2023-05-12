import "./styles/successful-booking.css"
import success from "../resources/success-icon.svg"
import { Link } from "react-router-dom";

const SuccessfulBooking = () => {
  return (
    <div className='successful-booking'>
       <img src={success}></img>
       <p>¡Muchas gracias!</p>
       <span>Su reserva se ha realizado con éxito</span>
       <Link to="/my-bookings">
        <button>OK</button>
       </Link>
    </div>
  )
}

export default SuccessfulBooking