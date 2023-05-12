import { useState, useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import "../styles/home/search-block.css";
import DropDown from "./DropDown";
import SearchCalendar from "../SearchCalendar";
import {
  getProductsByCity,
  getProductsByCityAndDate,
} from "../../utils/requestProductsHome";
import BookingContext from "../../context/BookingContext";

const SearchBlock = ({ setproducts ,setIsLoadingProducts}) => {
  const [dropDown, setDropDown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [datesPicked, setDatesPicked] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [finding, setfinding] = useState(false)

  const { range, setRange ,city, setCity} = useContext(BookingContext);
  console.log(!city && !range[0]);
 

  const clickCityHandler = () => {
    setDropDown(!dropDown);
    if (showCalendar) setShowCalendar(!showCalendar);
  };
  const clickDateHandler = () => {
    setShowCalendar(!showCalendar);
    if (dropDown) setDropDown(!dropDown);
  };

  const searchProducts = (e) => {
    e.preventDefault();
    if (range[1]) {
      // setLoading(true);
      // setRange([startDate, endDate]);
      setIsLoadingProducts(true);
      getProductsByCityAndDate(
        city,
        range[0].toLocaleDateString("en-US"),
        range[1].toLocaleDateString("en-US")
      ).then((resp) => {
        // setLoading(false);
        
        setproducts(resp.data);
     
        setIsLoadingProducts(false);
       
      });
    }
    if (!range[1] && city != "") {
      setIsLoadingProducts(true);
      getProductsByCity(city).then((resp) => {
        console.log(resp)
        setproducts(resp.data);
        setIsLoadingProducts(false);
       
      });
    }
  };

  return (
    <div className="search-block">
      <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      <form>
        <div>
          <div className="input-container">
            <div className="input-icon">
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <input
                readOnly
                value={cityInput}
                className=""
                id="city"
                type="text"
                onClick={clickCityHandler}
                placeholder="          ¿A dónde vamos?"
              />
            </div>
            <DropDown
              clickCityHandler={clickCityHandler}
              setCity={setCity}
              setCityInput={setCityInput}
              class={`select dropdown ${dropDown ? `active` : `inactive`}`}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input-icon">
            <div className="icon">
              <IoMdCalendar />
            </div>
            <input
              readOnly
              value={datesPicked}
              className=""
              id="dates"
              type="text"
              onClick={clickDateHandler}
              placeholder="          Check in - Check - out"
            />
          </div>
          <SearchCalendar
            footer={true}
            clickDateHandler={clickDateHandler}
            setValues={setDatesPicked}
            class={`select picker ${showCalendar ? `active` : `inactive`}`}
          />
        </div>
        <button 
        className="form-button" onClick={searchProducts}
        disabled={(!city  && !range[0]) ? true : false}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBlock;
