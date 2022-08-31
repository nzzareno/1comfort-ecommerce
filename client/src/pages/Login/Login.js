import React, { useState, useEffect } from "react";
import "./Login.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Required"),
      password: Yup.string().trim().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        await axios
          .post("http://localhost:8080/signup", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            setData(res.data);
            navigate("/");
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
            name="email"
            id="email"
            placeholder="Your email"
            required="required"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <small style={{ color: "red" }}>{formik.errors.email}</small>
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

export default Login;
