import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextOfProduct } from "../../context/MyContext";
import "./Quantity.scss";

const Quantity = ({ item, initial, stockState, setStockState }) => {
  let { it, setIt } = useContext(ContextOfProduct);

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
      // item.stock -= 1;
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
      // item.stock += 1;
    }
  }

  return (
    <>
      <label className="label-quantity" htmlFor="quantity" style={{
        color: "#121f3d",
        fontWeight: '600'
      }}>
        Quantity:
      </label>
      <div className="qty-input" style={{
        marginTop: '10px'
      }}>
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
          style={{
            width: '50px',
            textAlign: 'center',
            border: '1px solid #121f3d',
            borderRadius: '5px',
          
            color: '#121f3d',
            fontWeight: '600'
          }}
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
      <p style={{
        color: "#121f3d",
        paddingLeft: "8px",
        margin: '10px 0px',
        fontWeight: '600'
      }}>Stock: {stockState}</p>
    </>
  );
};

export default Quantity;
