import React, { useContext, useState } from "react";
import '../styles/auth/register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import baseURL from "../../hooks/axiosBase";
import AuthContext from "../../context/AuthContext";


const Register = () => {

    const [error, setError] = useState(false)
    const [password, setPassword] = useState("");
    const { handleAuth } = useContext(AuthContext);
    let navigate = useNavigate()

    let errorRegistro;
    const handleSubmit = (e) => {
        e.preventDefault()
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        if (password.length >= 6 && password === passwordConfirm) {
            let data = {
                email: document.getElementById('user').value,
                name: document.getElementById('name').value,
                lastName: document.getElementById('lastname').value,
                password: document.getElementById('password').value,
                role: {
                    idRole: 2
                }
            }
            let urlPost = baseURL + 'auth/register'
            axios.post(urlPost, data)
                .then((response) => {
                  
                    handleAuth(response.data)
                    sessionStorage.setItem("auth", true);
                    sessionStorage.setItem("userAuth", JSON.stringify(response.data));
                })
                .catch((e) => setError(e));
            navigate(`/`);
        } else {

            setError(true)
            setPassword(password.length)
        }
    }

    if (error !== false) {
        if (password < 6) {
            errorRegistro = <span className="error">La contraseña ingresada tiene menos de 6 caracteres</span>
        } else {
            errorRegistro = <span className="error">las contraseñas no coinciden</span>
        }

    } else {
        errorRegistro = <p></p>
    }


    return (
        <div className="register">
            <p className="heading-1 color-principal">Crear Cuenta</p>
            <form className="form-register" onSubmit={(event) => handleSubmit(event)}>
                <div className="row">
                    <div className="col-2">
                        <label className="text-2 color-second" htmlFor="name">
                            Nombre
                        </label>
                        <input className="nombre" id="name" type="text" />
                    </div>
                    <div className="col-2">
                        <label className="text-2 color-second" htmlFor="lastname">
                            Apellido
                        </label>
                        <input className="apellido" id="lastname" type="text" />
                    </div>
                </div>
                <div className="col">
                    <label className="text-2 color-second" htmlFor="user">
                        Correo electrónico
                    </label>
                    <input className="" id="user" type="email" required />
                </div>
                <div className="col">
                    <label className="text-2 color-second" htmlFor="password">
                        Contraseña
                    </label>
                    <input className="" id="password" type="password" />
                </div>
                <div className="col">
                    <label className="text-2 color-second" htmlFor="passwordConfirm">
                        Confirmar Contraseña
                    </label>
                    <input className="" id="passwordConfirm" type="password" />
                </div>
                <div className="div-error">{errorRegistro}</div>
                <div className="row-2">
                    <input type="submit" value="Crear cuenta" />
                    <p className="color-second">¿Ya tienes una cuenta? <Link to="/login"> Iniciar sesión</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Register;