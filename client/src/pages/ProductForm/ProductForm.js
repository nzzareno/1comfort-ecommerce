import React, { useState, useEffect } from "react";
import "./ProductForm.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";

const ProductForm = () => {
  const [data, setData] = useState(null);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const onSubmit = async (values) => {
    const { ...data } = values;

    const response = await fetch("http://localhost:8080/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const datos = await response.json();
    setData(datos);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      image: "",
      code: "",
      stock: "",
      category: "",
      logo: "",
      genre: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Required"),
      description: Yup.string().trim().required("Required"),
      price: Yup.string().trim().required("Required").max(10, "Max 10 digits"),
      image: Yup.string().trim().required("Required"),
      code: Yup.string().trim().required("Required"),
      stock: Yup.string().trim().required("Required"),
      category: Yup.string().trim().required("Required"),
      logo: Yup.string().trim().required("Required"),
      genre: Yup.string().trim().required("Required"),
    }),
    onSubmit,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="product__form-body"
    >
      <div className="sub__product-form">
        <h4>generate your product, what are you waiting for?</h4>
      </div>
      <div className="capa-form">
        <form
          onSubmit={formik.handleSubmit}
          action="api/productos"
          method="POST"
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Product title"
            required="required"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <small style={{ color: "red" }}>{formik.errors.title}</small>
          ) : null}
          <input
            type="text"
            name="price"
            id="price"
            onChange={formik.handleChange}
            placeholder="Price"
            required="required"
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <small style={{ color: "red" }}>{formik.errors.price}</small>
          ) : null}
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <small style={{ color: "red" }}>{formik.errors.description}</small>
          ) : null}
          <input
            type="url"
            name="image"
            id="image"
            placeholder="Product image(URL)"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.image}
          />
          {formik.touched.image && formik.errors.image ? (
            <small style={{ color: "red" }}>{formik.errors.image}</small>
          ) : null}
          <input
            type="url"
            name="logo"
            id="logo"
            placeholder="Brand logo(URL)"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.logo}
          />
          {formik.touched.image && formik.errors.image ? (
            <small style={{ color: "red" }}>{formik.errors.image}</small>
          ) : null}
          <input
            type="text"
            name="code"
            id="code"
            placeholder="Code"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <small style={{ color: "red" }}>{formik.errors.code}</small>
          ) : null}
          <input
            type="text"
            name="stock"
            id="stock"
            placeholder="Stock"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock ? (
            <small style={{ color: "red" }}>{formik.errors.stock}</small>
          ) : null}
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="category"
          >
            <option
              label="Please, select a category for this product "
              value="selector"
            ></option>
            <option label="hats" value="hats">
              Hats
            </option>
            <option label="footwear" value="footwear">
              Footwear
            </option>
            <option label="t-shirts" value="t-shirts">
              T-Shirts
            </option>
            <option label="men" value="men">
              Men
            </option>
            <option label="women" value="women">
              Women
            </option>
          </select>
          {formik.touched.category && formik.errors.category ? (
            <small style={{ color: "red" }}>{formik.errors.category}</small>
          ) : null}
          <select
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="genre"
          >
            <option
              label="Select the gender this product will target "
              value="selector"
            ></option>
            <option label="men" value="men">
              Men
            </option>
            <option label="women" value="women">
              Women
            </option>
          </select>
          {formik.touched.genre && formik.errors.genre ? (
            <small style={{ color: "red" }}>{formik.errors.genre}</small>
          ) : null}
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Share my product.
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductForm;
