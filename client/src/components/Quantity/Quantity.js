import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextOfProduct } from "../../context/MyContext";
import "./Quantity.scss";

const Quantity = ({ item, initial, stockState, setStockState }) => {
  let {
    carroData,
    cartQuantity,
    productosCarro,
    increaseCartNumber,
    decreaseCartNumber,
    cartNumber,
    setCartNumber,
    productoSend,
    addProductsToCart,
    it,
    setIt,
  } = useContext(ContextOfProduct);

  function handlerChange(e) {
    setIt(() => e.target.value);
    setStockState(() => e.target.value);
  }

  function handleClickedMore() {
    if (stockState === 0) {
      setIt(it);
    } else {
      setIt(() => it + 1);
      setStockState(() => stockState - 1);
      item.stock -= 1;
    }
  }

  function handleClickedLess() {
    if (stockState < 0) {
      setIt(it);
    } else if (it === 0) {
      setStockState(stockState);
    } else {
      setIt(() => it - 1);
      setStockState(() => stockState + 1);
      item.stock += 1;
    }
  }

  return (
    <>
      <label className="label-quantity" htmlFor="quantity">
        Quantity:
      </label>
      <div className="qty-input">
        <button
          className="qty-count qty-count--minus"
          data-action="minus"
          type="button"
          onClick={handleClickedLess}
        >
          -
        </button>
        <input
          className="product-qty"
          type="number"
          name="product-qty"
          min="0"
          onChange={handlerChange}
          value={it}
        />
        <button
          className="qty-count qty-count--add"
          data-action="add"
          type="button"
          onClick={handleClickedMore}
        >
          +
        </button>
      </div>
      <p>Stock: {stockState}</p>
    </>
  );
};

export default Quantity;
