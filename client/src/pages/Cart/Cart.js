import React, { useContext, useState, useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { ContextOfProduct } from "../../context/ProductContext";
import "./Cart.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ isOpenCart }) => {
  let {
    data,
    carroData,
    closeCart,
    productoSend,
    users,
    addProductsToCart,
    removeFromCart,
    setShow,
  } = useContext(ContextOfProduct);
  const navigate = useNavigate();
  setShow(true);

  function timeOut() {
    setTimeout(() => {
      navigate("/");
    }, 1400);
  }

  return (
    <div className="container-carro">
      <div className="encuadre">
        {/* <div className="users">
          <h1>Usuarios</h1>
          <div className="users-container">
            <div className="user">
              <h1>{users.nombre}</h1>
              <h1>{users.address}</h1>
              <h4>{users.age}</h4>
              <h3>{users.phone}</h3>
            </div>
          </div>
        </div> */}
        <div className="disappear">
          <div className="cart-title">
            <div>
              <h1>Shopping Cart</h1>

              <p className="sub-title">
                YOUR CART (
                <span className="cart-count">
                  {productoSend.length > 0 ? productoSend.length : 0}
                </span>
                )
              </p>
            </div>
            <div className="close-cart" onClick={closeCart}>
              <AiOutlineGift
                style={{
                  fontSize: "2rem",
                  color: "black",
                  marginBottom: "2.14rem",
                  marginLeft: ".07rem",
                  height: "1.8rem",
                }}
              />
            </div>

            <div className="total">
              <span className="total-txt">Total Amount</span>
              <span className="total-amount">
                <span>
                  {productoSend.length > 0 ? (
                    <span className="total-amount">
                      $
                      {productoSend
                        .map((item) => item.price * item.quantity)
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
            {productoSend.map((p, idx) => {
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
                      onClick={() => removeFromCart(p._id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="checkout">
            {productoSend.length > 0 ? (
              <button
                className="checkout-btn"
                onClick={() => {
                  addProductsToCart();
                  toast.success("Buy success!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  timeOut();
                }}
              >
                Proceed to Checkout
              </button>
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

{
  /* {carroData.map((item) => {
        const productos = item.products.map((item) => {
          return item;
        });
        return (
          <div>
            <h1>Carrito</h1>
            <div>
              {productos.map((item) => {
                return (
                  <div>
                    <img src={item.img} alt="" />
                    <h1>{item.title}</h1>
                    <h1>{item.price}</h1>
                  </div>
                );
              })}
            </div>
            );
          </div>
        );
      })} */
}

{
  /* {
        productoSend.map((p) => {
          return (
            <div>
              <img src={p.image} alt="" />
              <h1>{p.title}</h1>
              <h1>{p.price}</h1>
            </div>
          );
        })
      } */
}
