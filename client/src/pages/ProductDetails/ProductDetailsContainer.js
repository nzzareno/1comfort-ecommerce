import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContextOfProduct } from "../../context/MyContext";
import ProductDetails from "./ProductDetails";

const ProductDetailsContainer = () => {
  let { data, addToCart, addProductToCart, foot, setFoot } = useContext(ContextOfProduct);
  const { id } = useParams();

 
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setFoot(true);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [foot, setFoot]);

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
