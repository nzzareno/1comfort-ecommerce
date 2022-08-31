import React, { useState, useEffect } from "react";
import "./Register.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState(null);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      age: "",
      nombre: "",
      address: "",
      phone: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Required"),
      password: Yup.string().trim().required("Required"),
      age: Yup.number().required("Required"),
      nombre: Yup.string().trim().required("Required"),
      address: Yup.string().trim().required("Required"),
      phone: Yup.string().trim().required("Required"),
      avatar: Yup.string().trim().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios
          .post("http://localhost:8080/signin", {
            email: values.email,
            password: values.password,
            age: values.age,
            nombre: values.nombre,
            address: values.address,
            phone: values.phone,
            avatar: values.avatar,
          })
          .then((res) => {
            setData(res.data);
            if (res.data.message === "User created") {
              navigate("/signup");
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="product__form-body"
    >
      <div className="capa-form">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Your name"
            required="required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
          />
          {formik.touched.nombre && formik.errors.nombre ? (
            <small style={{ color: "red" }}>{formik.errors.nombre}</small>
          ) : null}

          <input
            type="number"
            name="age"
            id="age"
            placeholder="Your age"
            required="required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age ? (
            <small style={{ color: "red" }}>{formik.errors.age}</small>
          ) : null}

          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your address"
            required="required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <small style={{ color: "red" }}>{formik.errors.address}</small>
          ) : null}

          <input
            type="text"
            name="avatar"
            id="avatar"
            placeholder="Your avatar"
            required="required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <small style={{ color: "red" }}>{formik.errors.avatar}</small>
          ) : null}

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email"
            required="required"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <small style={{ color: "red" }}>{formik.errors.email}</small>
          ) : null}

          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your phone"
            required="required"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <small style={{ color: "red" }}>{formik.errors.phone}</small>
          ) : null}

          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            placeholder="Your password"
            required="required"
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <small style={{ color: "red" }}>{formik.errors.password}</small>
          ) : null}
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
