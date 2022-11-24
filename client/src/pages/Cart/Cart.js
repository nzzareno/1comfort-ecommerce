import React, { useContext, useState, useEffect, useRef } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { ContextOfProduct } from "../../context/MyContext";
import "./Cart.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Paypal from "../../components/Paypal/Paypal";

const Cart = () => {
  const [checkout, setCheckOut] = useState(false);
  let {
    addProductsToCart,
    removeFromCart,
    setShow,
    show,
    removeProductFromLocalStorage,
  } = useContext(ContextOfProduct);

  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, [show]);

  const storageProducts = JSON.parse(localStorage.getItem("products"));

  return (
    <div className="container-carro">
      <div className="encuadre">
        <div className="disappear">
          <div className="cart-title">
            <div>
              <h1>Shopping Cart</h1>
              <p className="sub-title">
                YOUR CART (
                <span className="cart-count">
                  {storageProducts
                    ? JSON.parse(localStorage.getItem("products")).length
                    : 0}
                </span>
                )
              </p>
            </div>
            <div className="close-cart">
              <AiOutlineGift
                style={{
                  fontSize: "2rem",
                  color: "black",
                  marginBottom: "4.91rem",
                  marginLeft: ".07rem",
                  height: "1.8rem",
                }}
              />
            </div>

            <div className="total">
              <span className="total-txt">Total Amount</span>
              <span className="total-amount">
                <span>
                  {storageProducts ? (
                    <span className="total-amount">
                      $
                      {storageProducts
                        .map((item) => item.price * item.quantity) // he aqui el error !!!
                        .reduce((a, b) => a + b)}
                    </span>
                  ) : (
                    "$0"
                  )}
                </span>
              </span>
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
          <ul className="cart-listado">
            {storageProducts &&
              JSON.parse(localStorage.getItem("products")).map((p, idx) => {
                return (
                  <li key={idx} className="cart-item">
                    <div className="cart-img">
                      <img src={p.image} alt="aleatorio" />
                    </div>
                    <div className="cart-info">
                      <div className="titulo">
                        <h1 className="cart-item-title">
                          {p.title}
                          <span className="cart-quantity">({p.quantity})</span>
                        </h1>
                      </div>
                      <div className="precioxe">
                        <p className="cart-price">${p.price}</p>
                      </div>
                    </div>
                    <div className="cart-remove">
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          removeProductFromLocalStorage(p._id);
                          removeFromCart(p._id);
                        }}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>

          <div className="checkout">
            {storageProducts ? (
              <>
                {checkout ? (
                  <Paypal />
                ) : (
                  <button
                    className="btn-checkout"
                    onClick={() => {
                      addProductsToCart();
                      setCheckOut(true);
                      toast.success("Your order has been placed successfully", {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                    }}
                  >
                    Checkout
                  </button>
                )}
              </>
            ) : (
              <h3 className="checkout-error-title">
                The cart is empty, go through our catalog and come back later
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
