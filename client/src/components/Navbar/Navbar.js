import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Pantalla from "../../assets/Pantalla.webp";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { ContextOfProduct } from "../../context/ProductContext";

const Navbar = () => {
  const [show, setShow] = useState(false);
  let { auth, setAuth } = useContext(ContextOfProduct);
  const changeBackground = () => {
    if (window.scrollY >= 101) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
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

              <li className={show ? "navbar__li" : "navbar--li"}>
                <Link to="/make-product">SPREAD PRODUCT</Link>
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
              <li className={show ? "navbar__li" : "navbar--li"}>
                <Link to="/">
                  <AiOutlineSearch className="search" />
                </Link>
              </li>
              <li className={show ? "navbar__li" : "navbar--li"}>
                <Link to={auth ? "/auth/logout" : "/signin"}>
                  {auth ? "DISCONNECT" : "SIGN UP"}
                </Link>
              </li>
              <li className={show ? "navbar__li" : "navbar--li"}>
                <Link to="/cart">
                  <BsCart4 className="carritox" />
                  <span className="carrito-span">14</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
