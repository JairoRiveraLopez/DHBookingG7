import React, { useContext, useState } from "react";
import "../styles/auth/login.css";
import { Link, useLocation, useNavigate, withRouter } from "react-router-dom";
import LoginBooking from "./LoginBooking";
import baseURL, { backendApi } from "../../hooks/axiosBase";
import AuthContext from "../../context/AuthContext";
import axios from "axios";


const Login = () => {
  const {handleAuth} = useContext(AuthContext)
  const [error, setError] = useState("")
  let navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const queryParams = new URLSearchParams(window.location.search);
    const idBooking = queryParams.get('error');
    const data = {
      email: user,
      password: password
    }
    try {
      let urlPost = baseURL + 'auth/login'
      axios.post(urlPost, data)
            .then((response) => {
            
                handleAuth(response.data)
                sessionStorage.setItem("auth", true);
                sessionStorage.setItem("userAuth", JSON.stringify(response.data));
                let path;
                idBooking ? path = `/product-detail/${idBooking}/bookings` :
                path = `/`;
                navigate(path,{state : location ? location.state : null});
            })
            .catch((e) => setError(e));
      
    } catch (error) {
      console.log(error)
    }
  }
    const queryParams = new URLSearchParams(window.location.search);
    const idBooking = queryParams.get('error');

    return (

      <div className="login">
        {idBooking && <LoginBooking />}
        <p className="heading-1 color-principal">Iniciar sesión</p>
        <form
          className="form-login"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="row-4">
            <label className="text-2 color-second" htmlFor="username">
              Username
            </label>
            <input className="" id="username" type="text" />
          </div>
          <div>
            <label className="text-2 color-second" htmlFor="password">
              Password
            </label>
            <input className="" id="password" type="password" />
          </div>
          <div className="div-error">{!!error && ( <span className="error">
            Por favor vuelva a intentarlo, sus credenciales son inválidas
          </span>)}</div>
          <div className="row-2">
            <input type="submit" value="Ingresar" />
            <p className="color-second">
              ¿Aún no tenes cuenta? <Link to="/register">Registrate</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }

export default Login;
