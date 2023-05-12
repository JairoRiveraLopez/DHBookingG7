import { ImageList, Tooltip } from "@material-ui/core";
import React from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import DetailBooking from "./booking/DetailBooking";
import { FormBooking } from "./booking/FormBooking";
import HourBooking from "./booking/HourBooking";
import ProductHeader from "./Product-detail/ProductHeader";
import ProductPolicies from "./Product-detail/ProductPolicies";
import SearchCalendar from "./SearchCalendar";
import "./styles/booking/booking.css";
import BookingContext from "../context/BookingContext";
import { getBookingsByProductId } from "../utils/bookings";
import Loading from "./Loading"

const Booking = () => {
  const { userAuth } = useContext(AuthContext);
  const {range,city,resetBooking} = useContext(BookingContext);
  const [checkin, setcheckin] = useState("___/___/____");
  const [checkout, setcheckout] = useState("___/___/____");
  const { state } = useLocation();
  console.log(state, "State")
 

  const address = `${state.location.address}, ${state.city.name}, ${state.city.state}, ${state.city.country}`;
  const [formValues, handleInputChange, reset] = useForm({
    name: userAuth.name,
    lastName: userAuth.lastName,
    email: userAuth.email,
    ciudad: city,
    hour: "",
  });

  const { name, lastName, email, ciudad, hour } = formValues;
  
  const dataBooking = {
    startHour: parseInt(hour.split(":")[0]),
    startDate: range[0]?.toLocaleDateString("en-US"),
    endDate: range[1]?.toLocaleDateString("en-US"),
    idProduct: state.idProduct,
    idUser: userAuth.idUser,
  };
  
  return (
    <div style={{ marginBottom: "58px", backgroundColor: "#DFE4EA" }}>
      <div className="product-detail-container">
        <ProductHeader
          category={state.category.title}
          name={state.title}
          location={state.city}
          distance={state.distance}
          rating={state.quality}
          pLocation={false}
        />
      </div>
      <div className="content-booking">
        <div className="booking">
          <div>
            <FormBooking
              name={name}
              lastName={lastName}
              email={email}
              city={ciudad}
              handleInputChange={handleInputChange}
            />
           
              <SearchCalendar
                booking={true}
                setcheckin={setcheckin}
                setcheckout={setcheckout}
                // clickDateHandler={clickDateHandler}
                // setValues={setDatesPicked}
                class="booking-calendar"
                forbiddenDates={state.forbiddenDatesFormat}
              />
            
            <HourBooking hour={hour} handleInputChange={handleInputChange} />
          </div>

          <DetailBooking
            rating={state.quality}
            img={state.images[0].url}
            category={state.category.title}
            title={state.title}
            address={address}
            checkin={range[0]?.toLocaleDateString("en-US")}
            checkout={range[1]?.toLocaleDateString("en-US")}
            dataBooking={dataBooking}
            token={userAuth.token}
            resetBooking={resetBooking}
          />
        </div>
      </div>
      <ProductPolicies
        normsPolicy={state.normPolicy}
        securityPolicy={state.securityPolicy}
        cancellationPolicy={state.cancellationPolity}
      />
    </div>
  );
};

export default Booking;
