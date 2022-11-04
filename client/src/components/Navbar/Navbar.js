import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { BsCart4 } from "react-icons/bs";
import { ContextOfProduct } from "../../context/ProductContext";
import { useDispatch } from "react-redux";

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
                <ul className="navbar__ul">
                  <li className={show ? "navbar__li" : "navbar--li"}>
                    <Link to="/men">MEN</Link>
                  </li>
                  <li className={show ? "navbar__li" : "navbar--li"}>
                    <Link to="/women">WOMEN</Link>
                  </li>
                </ul>
                <div className="navbar__logo">
                  <h1 className="navbar__title">
                    <Link
                      style={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: "white",
                      }}
                      to="/"
                    >
                      <span
                        style={{
                          fontSize: "2rem",
                        }}
                      >
                        1
                      </span>
                      COMFORT
                    </Link>
                  </h1>
                </div>
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
