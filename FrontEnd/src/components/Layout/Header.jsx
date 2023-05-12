import { useContext, useState } from "react";
import logo_non_desktop from "../../resources/logo_non_desktop.svg";
import logo_desktop from "../../resources/logo_desktop.svg";
import menu from "../../resources/menu.svg";
import tweeter_dark from "../../resources/tweeter-dark.svg";
import facebook_dark from "../../resources/facebook-dark.svg";
import instagram_dark from "../../resources/instagram-dark.svg";
import linkedin_dark from "../../resources/linkedin-dark.svg";
import "../styles/layout/header.css";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../utils/Auth";
import Avatar from "@material-ui/core/Avatar";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  let menuItems = ["Crear Cuenta", "Iniciar Sesión", "Mis Reservas", "Administrador"];
  const {auth, handleAuth , userAuth} = useContext(AuthContext)
  let [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  
  const clickHandler = () => {
    setShowMenu(!showMenu);
   
  };

  const logoutHandler = () => {
    handleAuth()
    sessionStorage.removeItem("auth")
    sessionStorage.removeItem("userAuth")
    navigate("/")
  };

  
  return (
    <header>
      <Link to="/">
        <img
          className="xs-screen logo"
          src={logo_non_desktop}
          alt="logo_non_desktop"
        />
        <img className="xl-screen logo" src={logo_desktop} alt="logo_desktop" />
      </Link>
      <img
        className="menu-icon"
        onClick={clickHandler}
        src={menu}
        alt="md-screen menu"
      />
      {auth ? (
        <div className="md-screen avatar">
          {userAuth.role.idRole != null && userAuth.role.idRole ===1 ?
            <button>
              <Link to="/administrator">{menuItems[3]}</Link>
            </button>
            :
            <button>
              <Link to="/my-bookings">{menuItems[2]}</Link>
            </button>
          }
          <div className="logout" onClick={logoutHandler}>
            {" "}
            X{" "}
          </div>
          <Avatar>{userAuth.name.charAt(0) + userAuth.lastName.charAt(0) }</Avatar>
          <div>
            <span className="welcome">Hola,</span>
            <br />
            <span className="welcome name">
              {userAuth.name + " " + userAuth.lastName}
            </span>
          </div>
        </div>
      ) : (
        <div className="md-screen buttons">
          <button>
            <Link to="/register">{menuItems[0]}</Link>
          </button>
          <button>
            <Link to="/login">{menuItems[1]}</Link>
          </button>
        </div>
      )}
      {auth ? (
        <div className={`xs-screen menu ${showMenu ? `active` : `inactive`}`}>
          <div className="top">
            <div className="close-menu" onClick={clickHandler}>
              {" "}
              X{" "}
            </div>
            <div className="div-avatar-mobile">
              <Avatar className="avatar-mobile">{userAuth.name.charAt(0) + userAuth.lastName.charAt(0) }</Avatar>
              <div>
                <span className="welcome">Hola,</span>
                <br />
                <span className="welcome name">
                  {userAuth.name + " " + userAuth.lastName}
                </span>
              </div>
            </div>
          </div>
          <ul className="list">
          <li>
              {userAuth.role.idRole != null && userAuth.role.idRole ===1 ?
                <Link to="/administrator">{menuItems[3]}</Link>
                :
                <Link to="/my-bookings">{menuItems[2]}</Link>
              }
            </li>
            <hr />
            <li>
              <span> ¿Deseas <a onClick={logoutHandler}>cerrar sesión</a>? </span>
            </li>
          </ul>          
          <div className="social">
            <ul>
              <li>
                <img src={facebook_dark} alt="facebook"></img>
              </li>
              <li>
                <img src={linkedin_dark} alt="linkedin"></img>
              </li>
              <li>
                <img src={tweeter_dark} alt="tweeter"></img>
              </li>
              <li>
                <img src={instagram_dark} alt="instagram"></img>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={`xs-screen menu ${showMenu ? `active` : `inactive`}`}>
          <div className="top">
            <div className="close-menu" onClick={clickHandler}>
              {" "}
              X{" "}
            </div>
            <h1>MENÚ</h1>
          </div>
          <ul className="list">
            <li>
              <Link to="/register">{menuItems[0]}</Link>
            </li>
            <hr />
            <li>
              <Link to="/login">{menuItems[1]}</Link>
            </li>
          </ul>
          <div className="social">
            <ul>
              <li>
                <img src={facebook_dark} alt="facebook"></img>
              </li>
              <li>
                <img src={linkedin_dark} alt="linkedin"></img>
              </li>
              <li>
                <img src={tweeter_dark} alt="tweeter"></img>
              </li>
              <li>
                <img src={instagram_dark} alt="instagram"></img>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
