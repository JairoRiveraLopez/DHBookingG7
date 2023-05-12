import React from 'react'
import useFetch from '../../hooks/useFetch';
import '../styles/booking/form-booking.css'
export const FormBooking = ({name,lastName,email,city,handleInputChange}) => {
  const { response: cities, isLoading } = useFetch({
    method: "get",
    url: "/cities",
  });

  return (
    <form className="content-form">
      <h1>Completá tus datos</h1>
      <div className="form-control">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="lastName"
          placeholder=""
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="correo">Correo Electronico</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="ciudad">Ciudad</label>
        <select id="city" name="city" value={city} onChange={handleInputChange}>
          {!isLoading &&
            cities.map((city, index) => (
              <option
                value={city.idCity}
                key={city.idCity}
                // defaultValue={city.idCity === city}
              >
                {city.name}
              </option>
            ))}
        </select>
      </div>
    </form>
  );
}
