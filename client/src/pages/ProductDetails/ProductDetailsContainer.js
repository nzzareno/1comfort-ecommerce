import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextOfProduct } from "../../context/ProductContext";
import ProductDetails from "./ProductDetails";

const ProductDetailsContainer = () => {
  let { data, carroData, increaseCartNumber, addToCart, addProductToCart } =
    useContext(ContextOfProduct);
  const { id } = useParams();

  function getProduct(id) {
    let product = data.find((product) => product._id === id);
    return console.log(product);
  }

  return (
    <>
      {data.map((item) => {
        return (
          item._id.toString() === id && (
            <ProductDetails
              key={item._id}
              getProduct={getProduct}
              addToCart={addToCart}
              item={item}
              addProductToCart={addProductToCart}
            />
          )
        );
      })}
    </>
  );
};

export default ProductDetailsContainer;
