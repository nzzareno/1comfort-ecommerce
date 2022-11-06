import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { BsCart4 } from "react-icons/bs";
import { ContextOfProduct } from "../../context/ProductContext";
import { useDispatch } from "react-redux";
import Logo from "../../assets/v3log.svg";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  let { changeBackground, show, setIsSignedIn, googleUser, setGoogleUser } =
    useContext(ContextOfProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = googleUser?.token;
    setGoogleUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    const token = user;
    setUser(localStorage.getItem("token"));
  }, [location]);

  const handleLogOut = async () => {
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
    setGoogleUser(null);
    setIsSignedIn(false);
  };

  const storageProducts = JSON.parse(localStorage.getItem("products"));

  window.addEventListener("scroll", changeBackground);

  return (
    <>
      {user || googleUser ? (
        <div className="contexto-nav">
          <header className="header-section d-none d-xl-block">
            <nav className={show ? "navbar active" : "navbar"}>
              <div className="navbar__menu">
               
              <Link to="/"  >
                  <img className="nav-logo" src={Logo} alt="LogoOneComfort" />
                </Link>
               
                <ul className="navbar__ul navbarv2">
                  <li className= "navbar--li">
                    <Link to="/men">MEN</Link>
                  </li>
                  <li className="navbar--li" style={{
                    marginLeft: "50px",
                  }}>
                    <Link to="/women">WOMEN</Link>
                  </li>
                </ul>
               
                <ul className="navbar__ul">
                  <li
                    onClick={handleLogOut}
                    className={show ? "navbar__li" : "navbar--li"}
                  >
                    <Link to={user || (googleUser && "/signin")}>
                      {user || googleUser ? "DISCONNECT" : "SIGN IN"}
                    </Link>
                  </li>
                  <li className={show ? "navbar__li" : "navbar--li"}>
                    <Link to="/cart">
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          outline: "none",
                          cursor: "pointer",
                          color: "white",
                        }}
                      >
                        <BsCart4 className="carritox" />
                        <span className="carrito-span">
                          {storageProducts
                            ? JSON.parse(localStorage.getItem("products"))
                                .length
                            : 0}
                        </span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Navbar;
