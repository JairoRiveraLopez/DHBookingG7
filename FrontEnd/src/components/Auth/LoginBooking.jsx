import React from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai'
import '../styles/auth/login-booking.css'



const LoginBooking = () => {
  return (
    <div className='login-booking'>
         <AiFillExclamationCircle size = '40px' /> 
         <p>Para realizar una reserva necesitas estar logueado</p>
    </div>
  )
}

export default LoginBooking