import React from "react";
import "../styles/booking/hour-booking.css";
import check from "../../resources/check.svg";
const HourBooking = ({hour,handleInputChange}) => {
  const hours = [
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
  ];
  return (
    <div className="content-hour">
      <h1>Tu Horario de llegada</h1>
      <div>
        <img src={check} alt="icon check" />
        <h2>
          Tu habitación va a estar lista para el check-in entre las 10:00 AM y
          las 11:00 PM
        </h2>
      </div>
      <div className="select-hours">
        <label htmlFor="hora">Indicá tu horario estimado de llegada</label>
        <select
          id="hora"
          name="hour"
          value={hour}
          onChange={handleInputChange}
        >
          <option  value="">
            Seleccionar hora de llegada
          </option>
          {hours.map((hour, index) => (
            <option value={hour} key={index}>
              {hour}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HourBooking;
