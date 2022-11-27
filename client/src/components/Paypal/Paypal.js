import React, { useRef, useState, useEffect, useContext } from "react";
import "./Paypal.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextOfProduct } from "../../context/MyContext";

export default function Paypal() {
  const {
    removeAllProductsFromLocalStorage,
    removeAllFromCart,
    users,
    handlerStock,
  } = useContext(ContextOfProduct);
  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const paypal = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const token = googleUser?.token;
    setGoogleUser(JSON.parse(localStorage.getItem("profile")));
    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
          width: "100%",
          height: 50,
        },
        createOrder: async () => {
          const createPay = await axios.post("/api/paypal/create-payment");

          return createPay.data.id;
        },
        onApprove: async (data, actions) => {
          const cart = await axios
            .get("/api/carrito")
            .then((res) => {
              return res.data;
            })
            .catch((err) => console.log(err));

          const itemsInOrder = cart[cart.length - 1];
          const productsInCart = itemsInOrder.products;

          productsInCart.map((p) => {
            return handlerStock(p._id);
          });

          await actions.order.capture().then(async (details) => {
            const postOrder = await axios
              .post(`/api/orders`, {
                products: productsInCart,
                total: details.purchase_units[0].amount.value,
                status: "completed",
                qtyProducts: productsInCart.length,
                currency_type: "USD",
                email: localStorage.getItem("profile")
                  ? googleUser.user.email
                  : users.email,
                history: [details],
              })
              .then((res) => {
                return res.data;
              })
              .catch((err) => console.log(err));
            return postOrder;
          });

          navigate("/successfull-payment");

          await removeAllProductsFromLocalStorage();
          await removeAllFromCart();
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div ref={paypal}></div>
    </div>
  );
}
