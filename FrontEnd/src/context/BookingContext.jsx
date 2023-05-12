import React, {useState} from 'react';


const BookingContext = React.createContext({})

export function BookingProvider ({children}) {
  const [range, setRange] = useState([null, null]);
  const [city, setCity] = useState(null)

  const resetBooking = ()=>{
    setRange([null, null]);
    setCity(null)
  }
  return <BookingContext.Provider value={{range, setRange,city,setCity,resetBooking}}>
    {children}
  </BookingContext.Provider>
}

export default BookingContext;