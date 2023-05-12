import { useEffect, useContext } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/home/search-calendar.css";
import BookingContext  from "../context/BookingContext";


const SearchCalendar = (props) => {
  const windowWidth = window.innerWidth;
  const { range, setRange } = useContext(BookingContext);

  // props.forbiddenDates&&console.log(props.forbiddenDates)

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setRange([start, end]);

    if (props.booking) {
      props.setcheckin(start.toLocaleDateString());
      if (end) {
        props.setcheckout(end.toLocaleDateString());
      } else props.setcheckout("___/___/____");
    }
  };
 

  const onClik = (e, startDate, endDate) => {
    e.preventDefault();
    const startDateStr =
      range[0].toString().split(" ")[2] +
      " de " +
      range[0].toString().split(" ")[1].toLowerCase();
    const endDateStr =
      range[1].toString().split(" ")[2] +
      " de " +
      range[1].toString().split(" ")[1].toLowerCase();
    let inputString = "";
    startDateStr === endDateStr
      ? (inputString = startDateStr + ".")
      : (inputString = startDateStr + " - " + endDateStr + ".");
    props.setValues("        " + inputString);
    props.clickDateHandler();
    // props.setStartDate(null);
    // props.setEndDate(null);
  };

  return (
    <div className={props.class}>
      {props.booking && <h1>Seleccioná tu fecha de reserva</h1>}
      <DatePicker
        selected={range[0]}
        onChange={onDateChange}
        startDate={range[0]}
        endDate={range[1]}
        selectsRange
        inline
        monthsShown={windowWidth < 768 ? 1 : 2}
        formatWeekDay={(dayName) => dayName.slice(0, 1).toUpperCase()}
        local={"es"}
        minDate={new Date}
        excludeDates={props.forbiddenDates ? props.forbiddenDates : [] }
        // excludeDates={[new Date(), new Date("2022-12-07"),new Date("2022-12-08")]}
      >
        {props.footer && (
          <div className="calendar-footer">
            <button
              className="calendar-button"
              onClick={(e) => onClik(e, props.startDate, props.endDate)}
            >
              Aplicar
            </button>
          </div>
        )}
      </DatePicker>
    </div>
  );
};

export default SearchCalendar;
