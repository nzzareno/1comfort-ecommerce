import details from "./ProductDetails.module.scss";
import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import Quantity from "../../components/Quantity/Quantity";
import { Link } from "react-router-dom";
import { ContextOfProduct } from "../../context/ProductContext";

const ProductDetails = ({ item, getProduct }) => {
  const {
    increaseCartNumber,
    setProductoSend,
    productoSend,
    addItem,
    it,
    setIt,
    setShow,
    show,
  } = useContext(ContextOfProduct);

  const [quantityCarro, setQuantityCarro] = useState(0);
  const [stockState, setStockState] = useState(item.stock);

  const onAdd = (cantidadCarro) => {
    setQuantityCarro(cantidadCarro);
    setProductoSend([...productoSend, { item: item, quantity: cantidadCarro }]);
    addItem(item, cantidadCarro);
    setIt(0);
  };

  setShow(true);

  return (
    <>
      <main className={details.containerex}>
        <div className={details.leftcolumn}>
          <img
            data-image="red"
            className={details.active}
            src={item.image}
            alt="imagen-producto"
          />
        </div>

        <div className={details.rightcolumn}>
          <div className={details.productdescription}>
            <Link to={"/" + item.category}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                {item.category}
              </span>
            </Link>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>

          <div>
            <Quantity
              stockState={stockState}
              setStockState={setStockState}
              item={item}
              initial={0}
              onAdd={onAdd}
            />
          </div>

          <div className={details.productprice}>
            <span>${item.price}</span>
            <Link
              to="#"
              onClick={
                it < 1
                  ? () =>
                      toast.error("Please select a quantity", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      })
                  : () => {
                      onAdd(it);
                      toast.success("Product added to cart", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
              }
              className={details.cartbtn}
            >
              Add to cart
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
