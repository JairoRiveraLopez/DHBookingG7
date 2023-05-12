import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../styles/user/user.css"
import { Link } from 'react-router-dom';
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { TbClock2 } from "react-icons/tb";
import { useEffect } from "react";
import { deleteBookingByUser, getBookingsByUserId } from "../../utils/bookings";
import { useState } from "react";
import Loading from "../Loading";
import back from '../../resources/back.svg'
const UserBookings = () => {

    const [userBookings , setUserBookings] = useState([])
    const [ isLoadingBookings, setIsLoadingBookings] = useState(true)
    const { userAuth} = useContext(AuthContext);
   

        
    useEffect ( () => {
        
            console.log(getBookingsByUserId (userAuth.idUser, userAuth.token).then(resp => {
                console.log(resp.data.sort())
                setUserBookings(resp.data.sort((a,b)=>{
                  return (
                    new Date(a.endDate).setDate(
                      new Date(a.endDate).getDate()
                    ) < new Date()
                  );
                }));
                setIsLoadingBookings(false)
            }))
        }, [])
   
    const deleteBooking = (id) => {
      console.log(id,"este es el id ")
        deleteBookingByUser(id, userAuth.token).then((resp) =>
          console.log(resp)
        );
       let bookingsUpdate = userBookings.filter(booking => booking.idBooking != id)
       setUserBookings(bookingsUpdate)
    }
    //!isLoadingBookings&&console.log(userBookings)

    return (
      <div className="user-bookings">
        <h1>Mis reservas</h1>
        <div className="content-bookings">
          {isLoadingBookings ? (
            <Loading />
          ) : userBookings.length > 0 ? (
            userBookings?.map((item) => (
              <div>
                <div className="booking-state">
                  <p>
                    {new Date(item.endDate).setDate(
                      new Date(item.endDate).getDate()
                    ) < new Date()
                      ? "Realizada"
                      : "Vigente"}
                  </p>
                </div>
                <div
                  className={`card ${
                    new Date(item.endDate).setDate(
                      new Date(item.endDate).getDate()
                    ) < new Date()
                      ? `inactive`
                      : `active`
                  } `}
                >
                  <div className="card-header">
                    <img src={item.product.images[0].url} alt="img product" />
                    <h3>{item.product.title}</h3>
                  </div>
                  <div className="card-body">
                    <p className="card-body-item">
                      {" "}
                      <span>
                        {" "}
                        <RiLoginCircleFill className="card-body-item-icon in" />{" "}
                        Check-in:{" "}
                      </span>{" "}
                      {item.startDate}
                    </p>

                    <p className="card-body-item">
                      {" "}
                      <span>
                        {" "}
                        <TbClock2 className="card-body-item-icon" /> Ingreso:{" "}
                      </span>{" "}
                      {item.startHour} Hs
                    </p>

                    <p className="card-body-item">
                      {" "}
                      <span>
                        {" "}
                        <RiLogoutCircleFill className="card-body-item-icon out" />{" "}
                        Check-out:{" "}
                      </span>{" "}
                      {item.endDate}
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link
                      key={item.product.idProduct}
                      to={`/product-detail/${item.product.idProduct}`}
                    >
                      <button>Ver lugar</button>
                    </Link>
                    {new Date(item.endDate).setDate(
                      new Date(item.endDate).getDate()
                    ) > new Date() && (
                      <button
                        onClick={()=> deleteBooking(item.idBooking)}
                        id="btn-cancelar"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div id="booking-empty">
              <h1 id="booking-empty-title" style={{ margin: 0 }}>
                Aún no has efectuado ninguna reserva
              </h1>
              <Link to="/" id="booking-empty-title">
                <img src={back} alt="icono back" />
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    );
}

export default UserBookings